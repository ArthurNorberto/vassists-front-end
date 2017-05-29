'use strict';

(function () {

    function CadastrarItensController($state, $cookies, PainelService, MensagemService) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.listaPerfil = {};
        vm.listaTipo = {};

        vm.dadosNovo = {
            Descricao: '',
            Identificacao: ''
        };

        vm.cadastrarPerfil = cadastrarPerfil;
        vm.editarPerfil = editarPerfil;
        vm.excluirPerfil = excluirPerfil;
        vm.cadastrarTipo = cadastrarTipo;
        vm.editarTipo = editarTipo;
        vm.excluirTipo = excluirTipo;

        recuperarPerfil();
        recuperarTipo();

        function recuperarPerfil() {

            PainelService.listarPerfil().then(function () {

                vm.listaPerfil = PainelService.listaPerfil;

            }, function (resposta) {

            });

        };

        function recuperarTipo() {

            PainelService.listarTipos().then(function () {

                vm.listaTipo = PainelService.listaTipos;

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


        function cadastrarTipo() {

            PainelService.cadastrarTipo(vm.dadosNovo).then(function () {

                toastr.success('Cadastrado com sucesso');

                vm.modoCadastro = false;
                recuperarTipo();

            }, function (resposta) {

            });

        };

        function editarTipo(registro) {

            PainelService.editarTipo(registro.Codigo, registro).then(function () {

                toastr.success('Alterado com sucesso');
                recuperarTipo();

            }, function (resposta) {

            });
        };

        function excluirTipo(registro) {


            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    PainelService.excluirTipo(registro.Codigo).then(function () {

                        toastr.success('Excluído com sucesso');
                        recuperarTipo();

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