'use strict';

(function() {

    function MeusDadosController($state, $cookies) {
        var vm = this;

        vm.dados = {
            Nome : 'TESTE',
            Perfil : 'USUÁRIO',
            UltimoLogin: '20/04/2017',
            UF: 'ES',
            Cidade : 'Vila Velha'
        };

    }

    angular.module('vassistsApp').controller('MeusDadosController', MeusDadosController);
})();