'use strict';
(function () {

    function MensagensService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaMensagens: '',
            data: '',
            listaMensagem: '',
            listarMensagens: listarMensagens,
            excluirMensagem: excluirMensagem,
            inserirMensagem: inserirMensagem,
            listaUltimasMensagens: listaUltimasMensagens

        };

        return service;

        //Declaração de funções
        function listarMensagens(filtro) {
            return $http
                .get(url + '/api/mensagem', {
                    params: {
                        qt: filtro.qt,
                        pg: filtro.pg
                    }
                })
                .then(function (resposta) {
                    service.listaMensagens = resposta.data;
                });
        };

        function listaUltimasMensagens() {
            return $http
                .get(url + '/api/mensagem/ultimas')
                .then(function (resposta) {
                    service.listaMensagem = resposta.data;
                });
        };

        function inserirMensagem(dados) {
            return $http
                .post(url + '/api/mensagem', {
                    CodigoUsuario: dados.CodigoUsuario,
                    Texto: dados.Texto
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function excluirMensagem(codigoMensagem) {
            return $http
                .delete(url + '/api/mensagem/' + codigoMensagem)
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };




    }
    angular.module('vassistsApp')
        .factory('MensagensService', MensagensService);
})();