'use strict';

(function () {

    function RelatorioController($state, $cookies, PainelService, PontosService, NgTableParams) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.listaTipo = {};
        vm.filtros = {
            CodigoTipo: '',
            DataInicial: '',
            DataFinal: '',
            NomeUsuario: '',
            Endereco: '',
            pg: '',
            qt: ''
        };

        vm.recuperarRelatorio = recuperarRelatorio;
        vm.limpar = limpar;

        recuperarTipo();
        carregarTabela();

        function recuperarTipo() {

            PainelService.listarTipos().then(function () {

                vm.listaTipo = PainelService.listaTipos;

            }, function (resposta) {

            });

        };


        function carregarTabela() {
            vm.tabelaExemplo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    Nome: 'asc'
                }
            }, {
                getData: function (params) {
                    vm.filtros.pg = params.page();
                    vm.filtros.qt = params.count();


                    vm.carregandoGrid = true;

                    return PontosService.listarPontos(vm.filtros).then(function () {
                        var pontos = PontosService.listaPontos.pontos;
                        var total = PontosService.listaPontos.quantidade;

                        params.total(total);

                        vm.carregandoGrid = false;
                        return pontos;
                    }, function (resposta) {
                        vm.carregandoGrid = false;
                        return vm.erro = resposta.data
                    });

                },
                counts: [10, 25, 50, 100]
            });
        };

        function recuperarRelatorio() {

            carregarTabela();
        };

        function limpar() {
            vm.filtros = {
                CodigoTipo: '',
                DataInicial: '',
                DataFinal: '',
                NomeUsuario: '',
                Endereco: '',
                pg: '',
                qt: ''
            };
        };

    }

    angular.module('vassistsApp').controller('RelatorioController', RelatorioController);
})();