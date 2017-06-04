'use strict';

(function () {

    function DadosPontosController($state, $cookies, $stateParams, NgTableParams, MensagemService, EstatisticaService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.graficoPontos = {};
        vm.graficoPontosEstado = {};
        vm.listaGraficoPontos = {};
        vm.listaGraficoPontosEstado = {};


        retornarGraficoPontos();
        retornarGraficoPontosEstado();

        function retornarGraficoPontos() {

            EstatisticaService.retornarGraficoPontos().then(function () {

                vm.listaGraficoPontos = EstatisticaService.listaGraficoPontos;
                configurarGraficoPontos();

            }, function (resposta) {

            });
        };

        function retornarGraficoPontosEstado() {

            EstatisticaService.retornarGraficoPontosEstado().then(function () {

                vm.listaGraficoPontosEstado = EstatisticaService.listaGraficoPontosEstado;
                configurarGraficoPontosEstado();

            }, function (resposta) {

            });
        };


        function configurarGraficoPontos() {
            vm.graficoPontos = {
                type: 'PieChart',
                data: {
                    cols: [{
                        label: 'Topping',
                        type: 'string'
                    }, {
                        label: 'Slices',
                        type: 'number'
                    }],
                    rows: []
                },
                options: {
                    chartArea: {
                        width: '90%',
                        height: '90%'
                    },
                    legend: {
                        position: 'left'
                    },
                    slices: {
                        1: {
                            color: '#FF6600'
                        }
                    }
                }
            };

            angular.forEach(vm.listaGraficoPontos, function (registro) {
                vm.graficoPontos.data.rows.push({
                    c: [{
                        v: registro.Tipo
                    }, {
                        v: registro.Quantidade
                    }]
                });
            });
        };

        function configurarGraficoPontosEstado() {
            vm.graficoPontosEstado = {
                type: 'PieChart',
                data: {
                    cols: [{
                        label: 'Topping',
                        type: 'string'
                    }, {
                        label: 'Slices',
                        type: 'number'
                    }],
                    rows: []
                },
                options: {
                    chartArea: {
                        width: '90%',
                        height: '90%'
                    },
                    legend: {
                        position: 'left'
                    },
                    slices: {
                        1: {
                            color: '#FF6600'
                        }
                    }
                }
            };

            angular.forEach(vm.listaGraficoPontosEstado, function (registro) {
                vm.graficoPontosEstado.data.rows.push({
                    c: [{
                        v: registro.Estado
                    }, {
                        v: registro.Quantidade
                    }]
                });
            });
        };

    }

    angular.module('vassistsApp').controller('DadosPontosController', DadosPontosController);
})();