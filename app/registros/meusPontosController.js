'use strict';

(function () {

    function MeusPontosController($state, $cookies, NgTableParams, MensagemService) {
        var vm = this;


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

                    return UsuarioService.listarUsuarios(vm.filtros).then(function () {
                        var usuarios = UsuarioService.listaUsuarios.Registros;
                        var total = UsuarioService.listaUsuarios.Total;

                        params.total(total);

                        vm.carregandoGrid = false;
                        return usuarios;
                    }, function (resposta) {
                        vm.carregandoGrid = false;
                        return vm.erro = resposta.data.Message
                    });

                },
                counts: [10, 25, 50, 100]
            });
        };

    }

    angular.module('vassistsApp').controller('MeusPontosController', MeusPontosController);
})();