'use strict';
(function () {

    function PontosService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaPontos: '',
            data: '',
            listaMeusPontos: '',
            listaTodosPontos: '',
            listarPontos: listarPontos,
            listarMeusPontos: listarMeusPontos,
            registrarPonto: registrarPonto,
            excluir: excluir,
            recuperarPonto: recuperarPonto,
            listarTodosPontos: listarTodosPontos
        };

        return service;

        //Declaração de funções
        function listarPontos(filtro) {
            return $http
                .get(url + '/api/ponto', {
                    params: {
                        qt: filtro.qt,
                        pg: filtro.pg,
                        CodigoTipo: filtro.CodigoTipo,
                        NomeUsuario: filtro.NomeUsuario,
                        DataInicial: filtro.DataInicial,
                        DataFinal: filtro.DataFinal,
                        Endereco: filtro.Endereco
                    }
                })
                .then(function (resposta) {
                    service.listaPontos = resposta.data;
                });
        };

        function listarMeusPontos(filtro) {
            return $http
                .get(url + '/api/meu-ponto', {
                    params: {
                        qt: filtro.qt,
                        pg: filtro.pg,
                        CodigoTipo: filtro.CodigoTipo,
                        CodigoUsuario: filtro.CodigoUsuario,
                        DataInicial: filtro.DataInicial,
                        DataFinal: filtro.DataFinal,
                        Endereco: filtro.Endereco
                    }
                })
                .then(function (resposta) {
                    service.listaMeusPontos = resposta.data;
                });
        };

        function listarTodosPontos() {
            return $http
                .get(url + '/api/todos-ponto')
                .then(function (resposta) {
                    service.listaTodosPontos = resposta.data;
                });
        };

        function recuperarPonto(codigo) {
            return $http
                .get(url + '/api/ponto/' + codigo)
                .then(function (resposta) {
                    service.dados = resposta.data;
                });
        };

        function registrarPonto(dados) {
            return $http
                .post(url + '/api/ponto', {
                    CodigoUsuario: dados.CodigoUsuario,
                    CodigoTipo: dados.CodigoTipo,
                    Observacao: dados.Observacao,
                    Latitude: dados.Latitude,
                    Longitude: dados.Longitude,
                    Endereco: dados.Endereco,
                    Estado: dados.Estado,
                    Cidade: dados.Cidade,
                    Pais: dados.Pais
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function excluir(codigo) {
            return $http
                .delete(url + '/api/ponto/' + codigo)
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

    }
    angular.module('vassistsApp')
        .factory('PontosService', PontosService);
})();