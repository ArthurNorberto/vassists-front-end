'use strict';

(function () {

    function DadosPontosController($state, $cookies, $stateParams, NgTableParams, MensagemService, EstatisticaService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.graficoPontos = {};
        vm.listaGraficoPontos = {};


        retornarGraficoPontos();

        function retornarGraficoPontos() {

            EstatisticaService.retornarGraficoPontos().then(function () {

                vm.listaGraficoPontos = EstatisticaService.listaGraficoPontos;
                configurarGraficoPontos();

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
                        position: 'none'
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

    }

    angular.module('vassistsApp').controller('DadosPontosController', DadosPontosController);
})();