'use strict';

(function() {

    function ForbiddenController($state, $cookies, $http, UsuarioService, MensagemService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');



    }

    angular.module('homeBasedApp').controller('ForbiddenController', ForbiddenController);
})();