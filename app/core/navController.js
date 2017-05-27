'use strict';

(function () {

    function NavController($state, $cookies, $http) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');
        // Inicialização de variáveis

        vm.isVisivel = isVisivel;

        function isVisivel() {

            return infoUsuario.Perfil == "A";
        };

    }

    angular.module('vassistsApp').controller('NavController', NavController);
})();