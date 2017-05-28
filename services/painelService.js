'use strict';
(function () {

    function PainelService($http, ApiService) {
        //Declaração de variáveis
        var url = ApiService.urlBase;

        //Registrando os métodos e variáveis no serviço
        var service = {
            listaPerfil: '',
            data: '',
            listaTipos: '',
            listarPerfil: listarPerfil,
            listarPerfilSemAdm: listarPerfilSemAdm,
            cadastrarPerfil: cadastrarPerfil,
            editarPerfil: editarPerfil,
            excluirPerfil: excluirPerfil,
            listarTipos: listarTipos
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

        function cadastrarPerfil(dados) {
            return $http
                .post(url + '/api/perfil', {
                    Descricao: dados.Descricao,
                    Identificacao: dados.Identificacao
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function editarPerfil(codigo, dados) {
            return $http
                .put(url + '/api/perfil/' + codigo, {
                    Descricao: dados.Descricao,
                    Identificacao: dados.Identificacao
                })
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };

        function excluirPerfil(codigo, dados) {
            return $http
                .delete(url + '/api/perfil/' + codigo)
                .then(function (resposta) {
                    service.data = resposta.data;
                });
        };


        function listarPerfilSemAdm() {
            return $http
                .get(url + '/api/perfil-sem')
                .then(function (resposta) {
                    service.listaPerfil = resposta.data;
                });
        };

        function listarTipos() {
            return $http
                .get(url + '/api/tipo')
                .then(function (resposta) {
                    service.listaTipos = resposta.data;
                });
        };


    }
    angular.module('vassistsApp')
        .factory('PainelService', PainelService);
})();