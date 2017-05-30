'use strict';
(function () {

    function EstatisticaService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaGrafico: '',
            data: '',

        };

        return service;

        //Declaração de funções
        function listaGrafico(filtro) {
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
                    service.data = resposta.data;
                });
        };




    }
    angular.module('vassistsApp')
        .factory('EstatisticaService', EstatisticaService);
})();