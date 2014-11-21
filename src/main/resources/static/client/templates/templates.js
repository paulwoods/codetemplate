(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('templates', {
			url : '/templates',
			templateUrl : 'client/templates/index.html',
			controller : 'TemplateController'
		})

		.state('templates.list', {
			url : '/list',
			templateUrl : 'client/templates/list.html',
			controller : 'TemplateListController'
		})

	})
	
	.service("Template", function($resource, api) {
		var url = api + '/templates';
		return $resource(url, {
			id: '@id',
			owner: '@owner'
		}, {
			create: {method: 'POST', url: url},
			read: {method: 'GET', url: url + '/:id'},
			update: {method: 'PUT', url: url + '/:id'},
			remove: {method: 'DELETE', url: url + '/:id'},
			list: {method: 'GET', url: url, isArray: true},
			checkout: {method: 'POST', url: url + '/checkout/:id'},
			cancel: {method: 'POST', url: url + '/cancel/:id'},
			lastUploadResult: {method: 'GET', url: url + '/lastUploadResult'}
		});
	})

	
	.controller('TemplateController', function() {
		
	})
	
	.controller('TemplateListController', function() {
		
	})
	
	;
	
})(angular);
