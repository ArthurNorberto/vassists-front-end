'use strict';

(function() {

    function LoginController($state, $cookies, $http, LoginService) {
        var vm = this;

        // Inicialização de variáveis
        vm.dados = {
            Login: '',
            Senha: ''
        };
        var dadosLogin = {};
        vm.autenticar = autenticar;

        // Funções executadas ao iniciar o controlador
        verificarUsuario();

        // Declaração de funções
        function verificarUsuario() {

            var infoUsuario = $cookies.get('infoUsuario');

            if (angular.isDefined(infoUsuario) && infoUsuario != null) {
                $state.go('app.inicio');
            }

            if (angular.isDefined($state.url)) {
                vm.erro = "Você precisa estar logado para acessar esta página.";
            }

        };

        function autenticar() {

            var expiraEm = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

            $cookies.putObject('infoUsuario', dadosLogin, { expires: expiraEm });
            $http.defaults.headers.common['Token_Autorizacao'] = 'dsadsadas';

            $state.go('app.inicio');

            // LoginService.autenticar(vm.dados).then(function() {

            //     dadosLogin = LoginService.dados;

            //     var expiraEm = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

            //     $cookies.putObject('infoUsuario', dadosLogin, { expires: expiraEm });
            //     $http.defaults.headers.common['Token_Autorizacao'] = dadosLogin.Token;

            //     toastr.info('Bem-vindo ' + dadosLogin.Nome);

            //     $state.go('app.inicio');




            // }, function(resposta) {
            //     vm.erro = resposta.data.Message;

            // });
        };

    }

    angular.module('vassistsApp').controller('LoginController', LoginController);
})();