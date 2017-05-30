'use strict';

(function () {

    function MeusPontosController($state, $cookies, NgTableParams, MensagemService, PainelService, PontosService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.filtros = {
            CodigoUsuario: infoUsuario.Codigo,
            DataInicial: '',
            DataFinal: '',
            Endereco: '',
            CodigoTipo: '',
            pg: '',
            qt: ''
        }

        vm.listaTipo = {};
        vm.buscarMeusPontos = buscarMeusPontos;
        vm.visualizar = visualizar;
        vm.deletarPonto = deletarPonto;
        vm.novoPonto = novoPonto;

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
                    vm.filtros.tpord = 'Asc';
                    vm.filtros.cpord = 'Nome';
                    vm.filtros.pg = params.page();
                    vm.filtros.qt = params.count();

                    //Obter campo de ordenacao
                    angular.forEach(params.sorting(), function (value, key) {
                        vm.filtros.cpord = key;
                        vm.filtros.tpord = value;
                    });

                    vm.carregandoGrid = true;

                    return PontosService.listarMeusPontos(vm.filtros).then(function () {
                        var pontos = PontosService.listaMeusPontos.pontos;
                        var total = PontosService.listaMeusPontos.quantidade;

                        params.total(total);

                        vm.carregandoGrid = false;
                        return pontos;
                    }, function (resposta) {
                        vm.carregandoGrid = false;
                        return vm.erro = resposta.data.Message
                    });

                },
                counts: [10, 25, 50, 100]
            });
        };

        function recuperarTipo() {

            PainelService.listarTipos().then(function () {

                vm.listaTipo = PainelService.listaTipos;

            }, function (resposta) {

            });

        };

        function buscarMeusPontos() {

            carregarTabela();
        };

        function visualizar(registro) {
            $state.go('app.visualizar-ponto', {
                parametro: registro.Codigo
            });
        };

        function novoPonto() {
            $state.go('app.cadastrar-pontos');
        };

        function deletarPonto(registro) {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    PontosService.excluir(registro.Codigo).then(function () {

                        toastr.success('Ponto excluído com sucesso');
                        carregarTabela();


                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });
        };


    }

    angular.module('vassistsApp').controller('MeusPontosController', MeusPontosController);
})();