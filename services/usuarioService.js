'use strict';
(function () {

    function UsuarioService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaPerfil: '',
            usuario: '',
            data: '',
            recuperarUsuario: recuperarUsuario,
            listarPerfil: listarPerfil,
            cadastro: cadastro
        };

        return service;

        //Declaração de funções
        function listarPerfil() {
            return $http
                .get(url + '/api/perfil')
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

        function cadastro(dados) {
            return $http
                .post(url + '/api/seguranca/cadastro', {
                    Nome: dados.Nome,
                    Email: dados.Email,
                    CodigoPerfil: dados.CodigoPerfil

                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

    }
    angular.module('vassistsApp')
        .factory('UsuarioService', UsuarioService);
})();