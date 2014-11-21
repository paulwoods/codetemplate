(function(angular) {
	
	'use strict';
	
	angular
	
	.module('codetemplate', [		
		'ngResource',
		'ui.router'
	])

	.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	})
	
	;
	
})(angular);