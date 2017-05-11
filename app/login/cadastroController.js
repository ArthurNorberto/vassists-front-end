'use strict';

(function () {

    function CadastroController($state, $cookies, $http, LoginService) {
        var vm = this;

        // Inicialização de variáveis
        vm.voltar = voltar;


        function voltar() {

            $state.go("login");

        };

    }

    angular.module('vassistsApp').controller('CadastroController', CadastroController);
})();