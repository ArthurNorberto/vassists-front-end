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
            cadastro: cadastro,
            listarPerfilSemAdm: listarPerfilSemAdm
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

        function listarPerfilSemAdm() {
            return $http
                .get(url + '/api/perfil-sem')
                .then(function (resposta) {
                    service.listaPerfil = resposta.data;
                });
        };

        function recuperarUsuario(codigo) {
            return $http
                .get(url + 'api/usuario/' + codigo)
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