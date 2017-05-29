'use strict';
(function () {

    function PontosService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaPontos: '',
            data: '',
            listarPontos: listarPontos,
            registrarPonto: registrarPonto
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

        function registrarPonto(dados) {
            return $http
                .post(url + '/api/ponto', {
                    CodigoUsuario: dados.CodigoUsuario,
                    CodigoTipo: dados.CodigoTipo,
                    Observacao: dados.Observacao,
                    Latitude: dados.Latitude,
                    Longitude: dados.Longitude,
                    Endereco: dados.Endereco
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

    }
    angular.module('vassistsApp')
        .factory('PontosService', PontosService);
})();