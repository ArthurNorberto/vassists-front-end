'use strict';
(function () {

    function LoginService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlAutenticacao;

        //Registrando os métodos e variáveis no serviço
        var service = {
            dados: '',
            usuario: {},
            autenticar: autenticar,
            desconectar: desconectar
        };

        return service;

        //Declaração de funções
        function autenticar(dadosUsuario) {
            return $http
                .post(url + 'api/Autenticacao/Autenticar', {
                    Login: dadosUsuario.Login,
                    Senha: dadosUsuario.Senha
                })
                .then(function (resposta) {
                    service.dados = resposta.data;
                });
        }


        function desconectar(token) {
            return $http
                .post(url + 'api/Autenticacao/Desconectar', {
                    Token: token
                })
                .then(function (resposta) {
                    service.dados = resposta.data;
                });

        }


    }
    angular.module('homeBasedApp')
        .factory('LoginService', LoginService);
})();