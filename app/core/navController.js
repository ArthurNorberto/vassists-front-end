'use strict';

(function () {

    function NavController($state, $cookies, $http) {
        var vm = this;

        // Inicialização de variáveis
        var infoUsuario = $cookies.getObject('infoUsuario');
        vm.menu = [];



    }

    angular.module('homeBasedApp').controller('NavController', NavController);
})();