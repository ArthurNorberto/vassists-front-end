'use strict';

(function() {

    function LandPageController($state, $cookies) {
        var vm = this;

        vm.dados = {
            Nome : 'TESTE',
            Perfil : 'USUÁRIO',
            UF: 'ES',
            Cidade : 'Vila Velha'
        };

    }

    angular.module('vassistsApp').controller('LandPageController', LandPageController);
})();