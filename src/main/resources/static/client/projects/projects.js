(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('projects', {
			url : '/projects',
			templateUrl : 'client/projects/index.html',
			controller : 'ProjectController'
		})

		.state('projects.list', {
			url : '/list',
			templateUrl : 'client/projects/list.html',
			controller : 'ProjectListController'
		})

	})
	
//	.service(function() {
//		
//	})
	
	.controller('ProjectController', function() {
		
	})
	
	.controller('ProjectListController', function() {
		
	})
	
	;
	
})(angular);
