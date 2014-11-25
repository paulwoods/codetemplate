(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('templates', {
			url : '/templates',
			templateUrl : 'client/templates/index.html'
		})

		.state('templates.list', {
			url : '/list',
			templateUrl : 'client/templates/list.html',
			controller : 'TemplateListController',
			controllerAs : 'TemplateListController'
		})

		.state('templates.create', {
			url : '/create',
			templateUrl : 'client/templates/create.html',
			controller : 'TemplateCreateController',
			controllerAs : 'TemplateCreateController'
		})

		.state('templates.show', {
			url : '/show/:id',
			templateUrl : 'client/templates/show.html',
			controller : 'TemplateShowController',
			controllerAs : 'TemplateShowController',
			resolve: {
				template: function($stateParams, Template) {
					return Template.read({id:$stateParams.id});
				}
			}
		})

		.state('templates.edit', {
			url : '/edit/:id',
			templateUrl : 'client/templates/edit.html',
			controller : 'TemplateEditController',
			controllerAs : 'TemplateEditController',
			resolve: {
				template: function($stateParams, Template) {
					return Template.read({id:$stateParams.id});
				}
			}
		})

		.state('templates.delete', {
			url : '/delete/:id',
			templateUrl : 'client/templates/delete.html',
			controller : 'TemplateDeleteController',
			controllerAs : 'TemplateDeleteController',
			resolve: {
				template: function($stateParams, Template) {
					return Template.read({id:$stateParams.id});
				}
			}
		})

	})

	.service("Template", function($resource, api, HalUtils) {
		var url = api + '/templates';
		return $resource(url, {
			id: '@id',
			groupId: '@groupId'
		}, {
			create: {method: 'POST', url: url, interceptor: HalUtils.create},
			read: {method: 'GET', url: url + '/:id', transformResponse: HalUtils.read},
			update: {method: 'PUT', url: url + '/:id'},
			remove: {method: 'DELETE', url: url + '/:id'},
			list: {method: 'GET', url: url, transformResponse: HalUtils.list},
			groups: {method: 'GET', url: url + '/:id/groups', transformResponse: HalUtils.list},
			attach: {method: 'PUT', url: url + '/:id/groups', headers: { 'Content-Type': 'text/uri-list;charset=utf-8' }},
			detach: {method: 'DELETE', url: url + '/:id/groups/:groupId'}
		});
	})
	
	.controller('TemplateCreateController', function($state, Template) {
		var vm = this;
		vm.template = new Template();
		
		vm.create = function() {
			vm.template.$create(function(template) {
				$state.go('^.show', {id: vm.template.id});
			});
		};
	})

	.controller('TemplateListController', function(Template) {
		var vm = this;
		vm.templates = Template.list();
	})
	
	.controller('TemplateShowController', function(template) {
		var vm = this;
		vm.template = template;
	})
	
	.controller('TemplateEditController', function($state, template) {
		var vm = this;
		vm.template = template;
		
		vm.update = function() {
			template.$update(function() {
				$state.go('^.show', {id:template.id});
			});
		};
	})
	
	.controller('TemplateDeleteController', function($state, template) {
		var vm = this;
		vm.template = template;
		
		vm.delete = function() {
			template.$remove(function() {
				$state.go('^.list');
			});
		};
	})
	
	;
	
})(angular);
