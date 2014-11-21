(function(angular) {

	'use strict';

	angular
	
	.module('codetemplate')
	
	.directive('specNavbar', function() {
		return {
			restrict: 'EA',
			templateUrl: 'client/directives/spec-navbar.html',
			scope: {
				title: '@',
				user: '@',
				build: '@'
			},
			link: function(scope) {
			},
			controller: function() {
			}
		};
	})
	
	;

})(angular);
