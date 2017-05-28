'use strict';
(function () {

    function UsuarioService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            usuario: '',
            data: '',
            listaUsuarios: '',
            recuperarUsuario: recuperarUsuario,
            cadastro: cadastro,
            excluir: excluir,
            resetarSenha: resetarSenha,
            listarUsuarios: listarUsuarios,
            alterarUsuario: alterarUsuario,
            alterarSenha: alterarSenha
        };

        return service;


        function recuperarUsuario(codigo) {
            return $http
                .get(url + 'api/usuario/' + codigo)
                .then(function (resposta) {
                    service.usuario = resposta.data;
                });
        };

        function cadastro(dados) {
            return $http
                .post(url + '/api/usuario', {
                    Nome: dados.Nome,
                    Email: dados.Email,
                    CodigoPerfil: dados.CodigoPerfil
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };


        function excluir(codigo) {
            return $http
                .delete(url + '/api/usuario/' + codigo)
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function resetarSenha(codigo) {
            return $http
                .patch(url + '/api/usuario/' + codigo + '/senha')
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function alterarSenha(codigo, dados) {
            return $http
                .put(url + '/api/usuario/' + codigo + '/senha', {
                    SenhaAntiga: dados.SenhaAntiga,
                    SenhaNova: dados.SenhaNova,
                    SenhaNovaConfirme: dados.SenhaNovaConfirme
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function alterarUsuario(codigo, dados) {
            return $http
                .put(url + '/api/usuario/' + codigo, {
                    Nome: dados.Nome,
                    Email: dados.Email,
                    CodigoPerfil: dados.CodigoPerfil
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };



        function listarUsuarios(filtro) {
            return $http
                .get(url + 'api/usuario', {
                    params: {
                        qt: filtro.qt,
                        pg: filtro.pg,
                        CodigoPerfil: filtro.CodigoPerfil,
                        Nome: filtro.Nome,
                        Email: filtro.Email
                    }
                })
                .then(function (resposta) {
                    service.listaUsuarios = resposta.data;
                });
        };

    }
    angular.module('vassistsApp')
        .factory('UsuarioService', UsuarioService);
})();