(function(){

	function AtgDatepicker($timeout, $filter){
		var diretiva = {
			link: link,
			restrict: 'A',
			require: "ngModel",
			scope : {
				maxDate : '=',
				minDate : '=',
			}
		};

		return diretiva;

		function link(scope, elemento, atributos, model) {
			//Declaração de variáveis
			var options = {};
			var minField = atributos.minfield ? $("#" + atributos.minfield) : undefined;
			var maxField = atributos.maxfield ? $("#" + atributos.maxfield) : undefined;			

			//Funções executadas no início
			iniciarDatepicker();			

			//Declaração de funções
			function iniciarDatepicker(){
				options = {
					closeText: 'Fechar',
					prevText: '&#x3C;Anterior',
					nextText: 'Próximo&#x3E;',
					currentText: 'Hoje',
					monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
					'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
					],
					monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
					'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
					],
					dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
					dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
					dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
					weekHeader: 'Sm',
					dateFormat: 'dd/mm/yy',
					firstDay: 0,
					isRTL: false,
					showMonthAfterYear: false,
					yearSuffix: '',
					onSelect: function(dateText) {
						aplicarValor(dateText);
					}
				};

				elemento.datepicker(options);
				elemento.mask("99/99/9999");
				elemento.attr('placeholder', '__/__/____');

				scope.$watch(function(){
					//Se o usuário digitar a data e clicar em um botão, a data é enviada sem formatação =(
					aplicarValor(elemento.val());
					return elemento.val();
				}, function(novoValor){
					var dataFormatada = $filter('date')(elemento.val(), 'shortDate'); 
					elemento.val(dataFormatada);
					aplicarValor(dataFormatada);
				});

				//Verificar data máxima e data mínima
				scope.$watch(function(){
					return scope.maxDate;
				}, function(nVal){
					if(nVal){
						if(!(nVal instanceof Date)){
							nVal = new Date(moment(nVal, 'MM-DD-YYYY').add(1, 'days').format('YYYY-MM-DD'));
						}

						elemento.datepicker('option', {
							maxDate: nVal
						});
					}
				});

				scope.$watch(function(){
					return scope.minDate;
				}, function(nVal){
					if(nVal){
						if(!(nVal instanceof Date)){
							nVal = new Date(moment(nVal, 'MM-DD-YYYY').add(1, 'days').format('YYYY-MM-DD'));
						}
						elemento.datepicker('option', {
							minDate: nVal
						});
					}
				});
			}

			function aplicarValor(dateText){
				var data = moment(dateText, 'DD/MM/YYYY');

				if(data.isValid()){
					model.$setViewValue(data.format('MM-DD-YYYY'));
					model.$modelValue = data.format('MM-DD-YYYY');
				}
			}
			
		}
	}

	angular.module('atg-datepicker', []).directive('atgDatepicker', AtgDatepicker);
})();