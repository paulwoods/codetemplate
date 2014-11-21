
(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('groups', {
			url : '/groups',
			templateUrl : 'client/groups/index.html',
			controller : 'GroupController'
		})

		.state('groups.list', {
			url : '/list',
			templateUrl : 'client/groups/list.html',
			controller : 'GroupListController'
		})

	})
	
//	.service(function() {
//		
//	})
	
	.controller('GroupController', function() {
		
	})
	
	.controller('GroupListController', function() {
		
	})
	
	;
	
})(angular);
