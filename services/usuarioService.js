'use strict';
(function () {

    function UsuarioService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaPerfil: '',
            usuario: '',
            recuperarUsuario: recuperarUsuario,
            listarPerfil: listarPerfil
        };

        return service;

        //Declaração de funções
        function listarPerfil() {
            return $http
                .get('api/perfil.json')
                .then(function (resposta) {
                    service.listaPerfil = resposta.data;
                });
        };

        function recuperarUsuario() {
            return $http
                .get('api/usuario.json')
                .then(function (resposta) {
                    service.usuario = resposta.data;
                });
        };

    }
    angular.module('vassistsApp')
        .factory('UsuarioService', UsuarioService);
})();