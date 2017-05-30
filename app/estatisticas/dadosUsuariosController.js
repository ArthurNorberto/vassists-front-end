'use strict';

(function () {

    function DadosUsuariosController($state, $cookies, $stateParams, NgTableParams, MensagemService, EstatisticaService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');


        vm.listaGraficoUsuarios = {};
        vm.graficoUsuarios = {};


        retornarGraficoUsuarios();

        function retornarGraficoUsuarios() {

            EstatisticaService.retornarGraficoUsuarios().then(function () {

                vm.listaGraficoUsuarios = EstatisticaService.listaGraficoUsuarios;
                configurarGraficoUsuarios();

            }, function (resposta) {

            });
        };

        function configurarGraficoUsuarios() {
            vm.graficoUsuarios = {
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

            angular.forEach(vm.listaGraficoUsuarios, function (registro) {
                vm.graficoUsuarios.data.rows.push({
                    c: [{
                        v: registro.Perfil
                    }, {
                        v: registro.Quantidade
                    }]
                });
            });
        };


    }

    angular.module('vassistsApp').controller('DadosUsuariosController', DadosUsuariosController);
})();