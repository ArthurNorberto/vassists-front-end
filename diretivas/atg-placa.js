angular.module('atg-placa', []).directive('atgPlaca', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
            modelCtrl.$viewValue = element.mask('aaa-9999');

            scope.$watch(function(){
            	return modelCtrl.$viewValue;
            }, function(nval){
                modelCtrl.$viewValue = element.mask();
                element.mask('aaa-9999');
            });
        }
    };
});