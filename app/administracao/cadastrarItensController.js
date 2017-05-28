'use strict';

(function () {

    function CadastrarItensController($state, $cookies, PainelService, MensagemService) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.listaPerfil = {};
        vm.listaProblema = {};

        vm.dadosNovo = {
            Descricao: '',
            Identificacao: ''
        };

        vm.cadastrarPerfil = cadastrarPerfil;
        vm.editarPerfil = editarPerfil;
        vm.excluirPerfil = excluirPerfil;

        recuperarPerfil();
        recuperarProblemas();

        function recuperarPerfil() {

            PainelService.listarPerfil().then(function () {

                vm.listaPerfil = PainelService.listaPerfil;

            }, function (resposta) {

            });

        };

        function recuperarProblemas() {

            PainelService.listarTipos().then(function () {

                vm.listaProblema = PainelService.listaTipos;

            }, function (resposta) {

            });

        };

        function cadastrarPerfil() {

            PainelService.cadastrarPerfil(vm.dadosNovo).then(function () {

                toastr.success('Cadastrado com sucesso');

                vm.modoCadastro = false;
                recuperarPerfil();

            }, function (resposta) {

            });

        };

        function editarPerfil(registro) {

            PainelService.editarPerfil(registro.Codigo, registro).then(function () {

                toastr.success('Alterado com sucesso');
                recuperarPerfil();

            }, function (resposta) {

            });
        };

        function excluirPerfil(registro) {


            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    PainelService.excluirPerfil(registro.Codigo).then(function () {

                        toastr.success('Excluído com sucesso');
                        recuperarPerfil();

                    }, function (resposta) {

                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });

        };


    }

    angular.module('vassistsApp').controller('CadastrarItensController', CadastrarItensController);
})();