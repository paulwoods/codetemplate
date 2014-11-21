(function(angular) {

	'use strict';

	angular
	
	.module('codetemplate')
	
	.directive('specHeader', function() {
		return {
			restrict: 'EA',
	        transclude: true,
			templateUrl: 'client/directives/spec-header.html',
		};
	})
	
	;

})(angular);
