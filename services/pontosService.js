'use strict';
(function () {

    function PontosService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaTipos: '',

            listarTipos: listarTipos
        };

        return service;

        //Declaração de funções
        function listarTipos() {
            return $http
                .get('api/problemas.json')
                .then(function (resposta) {
                    service.listaTipos = resposta.data;
                });
        }

    }
    angular.module('vassistsApp')
        .factory('PontosService', PontosService);
})();