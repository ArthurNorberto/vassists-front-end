'use strict';

(function () {

    function MensagemController($state, $cookies, $stateParams, NgTableParams, MensagemService, MensagensService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.dadosIncluir = {
            CodigoUsuario: infoUsuario.Codigo,
            Texto: ''
        };

        vm.filtros = {
            pg: '',
            qt: ''
        };

        vm.inserirMensagem = inserirMensagem;
        vm.excluirMensagem = excluirMensagem;

        listarMensagens();

        function listarMensagens() {
            carregarTabela();

        };

        function limpar() {
            vm.dadosIncluir = {
                CodigoUsuario: infoUsuario.Codigo,
                Mensagem: ''
            };
        };

        function inserirMensagem() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    MensagensService.inserirMensagem(vm.dadosIncluir).then(function () {
                        toastr.success("Mensagem inserida com sucesso!");
                        listarMensagens();
                        limpar();

                    }, function (resposta) {

                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });



        };

        function excluirMensagem(registro) {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    MensagensService.excluirMensagem(registro).then(function () {
                        toastr.success("Mensagem excluída com sucesso!");
                        listarMensagens();

                    }, function (resposta) {

                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

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

                    return MensagensService.listarMensagens(vm.filtros).then(function () {
                        var mensagens = MensagensService.listaMensagens.mensagens;
                        var total = MensagensService.listaMensagens.quantidade;

                        params.total(total);

                        vm.carregandoGrid = false;
                        return mensagens;
                    }, function (resposta) {
                        vm.carregandoGrid = false;
                        return vm.erro = resposta.data
                    });

                },
                counts: [10, 25, 50, 100]
            });
        };



    }

    angular.module('vassistsApp').controller('MensagemController', MensagemController);
})();