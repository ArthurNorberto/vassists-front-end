'use strict';
(function () {

    function RespostasService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaRespostas: '',
            data: '',
            listarRespostas: listarRespostas,
            inserirResposta: inserirResposta

        };

        return service;

        //Declaração de funções
        function listarRespostas(codigoPonto) {
            return $http
                .get(url + '/api/ponto/' + codigoPonto + '/resposta')
                .then(function (resposta) {
                    service.listaRespostas = resposta.data;
                });
        };

        function inserirResposta(codigoPonto, dados) {
            return $http
                .post(url + '/api/ponto/' + codigoPonto + '/resposta', {
                    CodigoUsuario: dados.CodigoUsuario,
                    Texto: dados.Texto
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };




    }
    angular.module('vassistsApp')
        .factory('RespostasService', RespostasService);
})();