(function(angular) {
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'client/home/index.html',
			controller : 'HomeController'
		})

	})
	
	.controller('HomeController', function() {
		
	})
	
	;
	
})(angular);
