'use strict';

(function () {

    function HeaderController($state, $cookies, $http, LoginService) {
        var vm = this;
        var infoUsuario = $cookies.get('infoUsuario');

        // Inicialização de variáveis
        vm.sair = sair;
        vm.usuarioLogado = usuarioLogado;


        // Funções executadas ao iniciar o controlador
        if (infoUsuario == null) {
            $state.go('login');
            return;
        };

        // Declaração de funções
        function sair() {

            if (infoUsuario == null) {
                $state.go('login');
                return;
            }

            LoginService.desconectar('39143c0b-2304-4fec-858e-6f22dc880c9a').then(function () {
                $cookies.remove('infoUsuario');
                $cookies.remove('modulo');
                $state.go('login');
            });
        };


        function usuarioLogado() {
            var infoUsuario = $cookies.getObject('infoUsuario');

            return infoUsuario === undefined ? '' : infoUsuario.Nome.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
                return m.toUpperCase();
            });
        };





    }

    angular.module('homeBasedApp').controller('HeaderController', HeaderController);
})();