'use strict';

(function () {

    function GerenciarUsuarioController($state, $cookies, UsuarioService, NgTableParams, MensagemService, PainelService) {
        var vm = this;

        vm.filtros = {
            Nome: '',
            Email: '',
            CodigoPerfil: '',
            pg: '',
            qt: ''

        };
        vm.tabelaExemplo = [];
        vm.listaPerfil = {};

        vm.limpar = limpar;
        vm.buscarUsuarios = buscarUsuarios;
        vm.excluir = excluir;
        vm.editar = editar;
        vm.novoUsuario = novoUsuario;
        vm.resetar = resetar;
        vm.exportarExcel = exportarExcel;

        recuperarPerfil();
        carregarTabela();

        function recuperarPerfil() {

            PainelService.listarPerfil().then(function () {

                vm.listaPerfil = PainelService.listaPerfil;

            }, function (resposta) {

            });

        };

        function limpar() {

            vm.filtros = {
                Nome: '',
                Email: '',
                CodigoPerfil: ''
            };

        };

        function buscarUsuarios() {

            carregarTabela();

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

                    return UsuarioService.listarUsuarios(vm.filtros).then(function () {
                        var usuarios = UsuarioService.listaUsuarios.usuarios;
                        var total = UsuarioService.listaUsuarios.quantidade;

                        params.total(total);

                        vm.carregandoGrid = false;
                        return usuarios;
                    }, function (resposta) {
                        vm.carregandoGrid = false;
                        return vm.erro = resposta.data
                    });

                },
                counts: [10, 25, 50, 100]
            });
        };

        function excluir(registro) {


            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    UsuarioService.excluir(registro.CodigoUsuario).then(function () {

                        toastr.success('Usuário excluído com sucesso');
                        carregarTabela();


                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });
        };

        function resetar(registro) {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {
                    //Aqui o usuário clicou em "Sim"

                    UsuarioService.resetarSenha(registro.CodigoUsuario).then(function () {

                        toastr.success('Senha resetada');

                        vm.mensagem = 'A senha do usuário ' + registro.Nome + ' foi resetada com sucesso, favor informar a senha padrão 123456 e solicitar que o mesmo efetue a troca.';

                    }, function (resposta) {

                        vm.erro = resposta.data;

                    });



                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });
        };

        function editar(registro) {

            $state.go('app.administracao-alterar-usuario', {
                parametro: registro.CodigoUsuario
            });

        };

        function exportarExcel(registro) {

        };

        function novoUsuario() {
            $state.go('app.administracao-cadastrar-usuario');
        };

    }

    angular.module('vassistsApp').controller('GerenciarUsuarioController', GerenciarUsuarioController);
})();