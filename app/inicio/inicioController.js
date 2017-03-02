'use strict';

(function() {

    function InicioController($state, $cookies) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');
    }

    angular.module('homeBasedApp').controller('InicioController', InicioController);
})();