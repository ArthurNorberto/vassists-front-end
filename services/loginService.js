'use strict';
(function () {

    function LoginService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            dados: '',
            usuario: {},
            autenticar: autenticar,
            desconectar: desconectar,
            cadastro: cadastro
        };

        return service;

        //Declaração de funções
        function autenticar(dadosUsuario) {
            return $http
                .post(url + '/api/seguranca/login', {
                    Login: dadosUsuario.Login,
                    Senha: dadosUsuario.Senha
                })
                .then(function (resposta) {
                    service.dados = resposta.data;
                });
        };


        function desconectar(token) {
            return $http
                .post(url + '/api/seguranca/login', {
                    Token: token
                })
                .then(function (resposta) {
                    service.dados = resposta.data;
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
        .factory('LoginService', LoginService);
})();