'use strict';

(function () {

    function HeaderController($state, $cookies, $http, LoginService) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');

        // Inicialização de variáveis
        vm.sair = sair;
        vm.usuarioLogado = usuarioLogado;


        // Funções executadas ao iniciar o controlador

        // Declaração de funções
        function sair() {

            $cookies.remove('infoUsuario');
            $state.go('login');

            // LoginService.desconectar('39143c0b-2304-4fec-858e-6f22dc880c9a').then(function () {
            //     $cookies.remove('infoUsuario');
            //     $cookies.remove('modulo');
            //     $state.go('login');
            // });
        };


        function usuarioLogado() {

            return infoUsuario === undefined ? '' : infoUsuario.Nome.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
                return m.toUpperCase();
            });
        };





    }

    angular.module('vassistsApp').controller('HeaderController', HeaderController);
})();