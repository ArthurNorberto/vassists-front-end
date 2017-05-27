(function () {

    function ApiService($injector, $cookies, $q) {
        //Declaração de variáveis

        //Registrando os métodos e variáveis no serviço
        var service = {
            urlBase: "http://vassists.azurewebsites.net/",
            urlGoogle: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyAj5uofof5uXMLSu8zeedIickSncGlf4",
            request: request,
            verificarAutenticacao: verificarAutenticacao,
            responseError: responseError
        }

        function request(request) {
            var infoUsuario = $cookies.getObject('infoUsuario');
            if (request.url.indexOf("api") > 0) {
                if (infoUsuario) {
                    $injector.get("$http").defaults.headers.common['Token_Autorizacao'] = infoUsuario.Token;

                }

            }

            return request;
        };

        function verificarAutenticacao(event, toState, toParams, fromState, fromParams) {

            var infoUsuario = $cookies.getObject('infoUsuario');
            if (!toState.publico && !infoUsuario) {
                event.preventDefault();
                toastr.warning("Sua sessão expirou. Logue-se novamente");
                // $injector.get("$state").go('login');
            } else if (infoUsuario) {
                $injector.get("$http").defaults.headers.common['Token_Autorizacao'] = infoUsuario.Token;
            }
        };


        function responseError(response) {
            if (response.status == 401) {
                $cookies.remove("infoUsuario");
                //   $injector.get('$state').go("login");
                toastr.warning("Sua sessão expirou! Por favor, logue-se novamente");
                return $q.reject(response);
            } else if (response.status == 500) {
                toastr.error(response.data.Message);
                return $q.reject(response);
            } else if (response.status == 404) {
                toastr.warning("Rota não encontrada.");
                return $q.reject(response);
            } else if (response.status == 400) {
                toastr.info(response.data.Message);
                return $q.reject(response);
            } else if (response.status == 403) {
                $injector.get('$state').go("app.forbidden");
                return $q.reject(response);
            }
        };

        return service;


    }; // Fim da função principal

    //Registrando o serviço na aplicação
    angular.module('vassistsApp').factory("ApiService", ApiService);

})();