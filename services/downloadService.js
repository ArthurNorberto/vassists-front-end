'use strict';
(function () {

    function DownloadService($http) {
        var downloadService = {};

        downloadService.baixarExcel = function (data, nome) {
            nome = (nome || "relatorio") + '.xlsx';

            downloadService.baixarArquivo(nome, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", data);
        };

        downloadService.baixarArquivo = function (nome, mimeType, data) {
            var fileName = nome;
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";

            var blob = new Blob([data], {
                type: mimeType
            });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);

            } else {

                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                document.body.removeChild(a);
            }
        };

        return downloadService;
    };


    angular.module('homeBasedApp')
        .factory('DownloadService', DownloadService);
})();