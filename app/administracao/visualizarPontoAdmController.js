'use strict';

(function () {

    function VisualizarPontoAdmController($state, $cookies, $stateParams, NgTableParams, MensagemService, PainelService, PontosService, RespostasService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        var codigoPonto = $stateParams.parametro;

        vm.listaResposta = {};

        vm.excluirPonto = excluirPonto;
        vm.voltar = voltar;
        vm.inserirResposta = inserirResposta;

        vm.dadosIncluir = {
            CodigoUsuario: infoUsuario.Codigo,
            Texto: ''
        }

        recuperarPonto();
        recuperarRespostas();


        function recuperarPonto() {

            PontosService.recuperarPonto(codigoPonto).then(function () {

                vm.dados = PontosService.dados;

            }, function (resposta) {

            });
        };

        function recuperarRespostas() {

            RespostasService.listarRespostas(codigoPonto).then(function () {

                vm.listaResposta = RespostasService.listaRespostas;

            }, function (resposta) {


            });
        };

        function inserirResposta() {
            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    RespostasService.inserirResposta(codigoPonto, vm.dadosIncluir).then(function () {
                        recuperarRespostas();
                        toastr.success('Resposta Inserida com Sucesso!');
                        limpar();

                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });

        };

        function excluirPonto() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    PontosService.excluir(codigoPonto).then(function () {

                        toastr.success('Ponto excluido com Sucesso!');
                        $state.go('app.meus-pontos');


                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });
        };

        function limpar() {


            vm.dadosIncluir = {
                CodigoUsuario: infoUsuario.Codigo,
                Texto: ''
            };
        };

        function voltar() {

            $state.go('app.administracao-relatorio');
        };





    }

    angular.module('vassistsApp').controller('VisualizarPontoAdmController', VisualizarPontoAdmController);
})();