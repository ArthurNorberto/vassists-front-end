'use strict';

(function () {
    angular
        .module('vassistsApp', [
            'oc.lazyLoad',
            'ui.router',
            'ui.bootstrap',
            'angular-loading-bar',
            'ngTable',
            'ngMask',
            'ui.utils.masks',
            'ui.load',
            'googlechart',
            'atg-datepicker',
            'atg-placa',
            'ngCookies',
            'bootstrapLightbox',
            'angular-storage',
            'ngFileUpload',
            'localytics.directives',
            'angular-input-stars',
            'easypiechart',
            'ngMap'
        ])
        .run(function ($http, $rootScope, $cookies, $state, ApiService) {
            toastr.options = {
                "debug": false,
                "positionClass": "toast-top-right margin-top-6",
                "onclick": null,
                "fadeIn": 300,
                "fadeOut": 800,
                "timeOut": 3000,
                "extendedTimeOut": 1000,
                "closeButton": true
            };

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                ApiService.verificarAutenticacao(event, toState, toParams, fromState, fromParams);
            });
        })
        .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, LightboxProvider) {

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });

            $urlRouterProvider.otherwise('/landpage');

            $httpProvider.interceptors.push('ApiService');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    publico: true
                })
                .state('cadastro', {
                    url: '/cadastro',
                    templateUrl: 'app/login/cadastro.html',
                    controller: 'CadastroController',
                    controllerAs: 'vm',
                    publico: true
                })
                .state('landpage', {
                    url: '/landpage',
                    templateUrl: 'app/landpage/landpage.html',
                    controller: 'LandPageController',
                    controllerAs: 'vm',
                    publico: true
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'app/core/app.html',
                    controller: 'AppController'
                })
                .state('app.inicio', {
                    url: '/inicio',
                    templateUrl: 'app/inicio/inicio.html',
                    controller: 'InicioController',
                    controllerAs: 'vm'
                })
                .state('app.meus-dados', {
                    url: '/painel/meus-dados',
                    templateUrl: 'app/painel/dados/meus-dados.html',
                    controller: 'MeusDadosController',
                    controllerAs: 'vm'
                })
                .state('app.alterar-senha', {
                    url: '/painel/alterar-senha',
                    templateUrl: 'app/painel/dados/alterar-senha.html',
                    controller: 'AlterarSenhaController',
                    controllerAs: 'vm'
                })
                .state('app.administracao-relatorio', {
                    url: '/administracao/relatorio',
                    templateUrl: 'app/administracao/relatorio.html',
                    controller: 'RelatorioController',
                    controllerAs: 'vm'
                })
                .state('app.administracao-cadastrar-usuario', {
                    url: '/administracao/cadastrar-usuario',
                    templateUrl: 'app/administracao/cadastrar-usuario.html',
                    controller: 'CadastrarUsuarioController',
                    controllerAs: 'vm'
                })
                .state('app.administracao-gerenciar-usuario', {
                    url: '/administracao/gerenciar-usuario',
                    templateUrl: 'app/administracao/gerenciar-usuario.html',
                    controller: 'GerenciarUsuarioController',
                    controllerAs: 'vm'
                })
                .state('app.administracao-alterar-usuario', {
                    url: '/administracao/alterar-usuario/:parametro',
                    templateUrl: 'app/administracao/alterar-usuario.html',
                    controller: 'AlterarUsuarioController',
                    controllerAs: 'vm'
                })
                .state('app.administracao-cadastrar-itens', {
                    url: '/administracao/cadastrar-itens',
                    templateUrl: 'app/administracao/cadastrar-itens.html',
                    controller: 'CadastrarItensController',
                    controllerAs: 'vm'
                })
                .state('app.cadastrar-pontos', {
                    url: '/registros/cadastrar-pontos',
                    templateUrl: 'app/registros/cadastrar-pontos.html',
                    controller: 'CadastrarPontosController',
                    controllerAs: 'vm'
                })
                .state('app.meus-pontos', {
                    url: '/registros/meus-pontos',
                    templateUrl: 'app/registros/meus-pontos.html',
                    controller: 'MeusPontosController',
                    controllerAs: 'vm'
                })
                .state('app.forbidden', {
                    url: '/forbidden',
                    templateUrl: 'app/core/blocks/forbidden.html',
                    controller: 'ForbiddenController',
                    controllerAs: 'vm'
                });
        });
})();