'use strict';

(function() {
    angular
        .module('homeBasedApp', [
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
            'easypiechart'
        ])
        .run(function($http, $rootScope, $cookies, $state, ApiService) {
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

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                ApiService.verificarAutenticacao(event, toState, toParams, fromState, fromParams);
            });
        })
        .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, LightboxProvider) {

            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
            });

            $urlRouterProvider.otherwise('/login');

            $httpProvider.interceptors.push('ApiService');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController',
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
                .state('app.forbidden', {
                    url: '/forbidden',
                    templateUrl: 'app/core/blocks/forbidden.html',
                    controller: 'ForbiddenController',
                    controllerAs: 'vm'
                });
        });
})();