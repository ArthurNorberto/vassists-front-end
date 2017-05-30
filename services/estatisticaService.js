'use strict';
(function () {

    function EstatisticaService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaGraficoUsuarios: '',
            listaGraficoPontos: '',
            data: '',
            retornarGraficoUsuarios: retornarGraficoUsuarios,
            retornarGraficoPontos: retornarGraficoPontos

        };

        return service;

        //Declaração de funções
        function retornarGraficoUsuarios() {
            return $http
                .get(url + '/api/estatistica/usuario')
                .then(function (resposta) {
                    service.listaGraficoUsuarios = resposta.data;
                });
        };

        function retornarGraficoPontos() {
            return $http
                .get(url + '/api/estatistica/ponto')
                .then(function (resposta) {
                    service.listaGraficoPontos = resposta.data;
                });
        };




    }
    angular.module('vassistsApp')
        .factory('EstatisticaService', EstatisticaService);
})();