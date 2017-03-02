(function() {
    function UploadService(Upload) {
        var uploadService = {};

        uploadService.fazerUpload = function(config) {
            return Upload.upload({
                url: config.url,
                method: "POST",
                data: config.data
            });

        };

        return uploadService;
    }

    angular.module('homeBasedApp')
        .factory('UploadService', UploadService);
})();