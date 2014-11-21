(function(angular) {

	'use strict';

	angular
	
	.module('codetemplate')
	
	.directive('specInstructions', function() {
		return {
			restrict: 'EA',
	        transclude: true,
			templateUrl: 'client/directives/spec-instructions.html',
			scope: {
			}
		};
	})
	
	;

})(angular);
