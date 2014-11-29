(function(angular, window) {
	
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
					return Template.read({id:$stateParams.id}).$promise;
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
					return Template.read({id:$stateParams.id}).$promise;
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
					return Template.read({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('templates.build', {
			url : '/build/:id',
			templateUrl : 'client/templates/build.html',
			controller : 'TemplateBuildController',
			controllerAs : 'TemplateBuildController',
			resolve: {
				template: function($stateParams, Template) {
					return Template.read({id:$stateParams.id}).$promise;
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
			detach: {method: 'DELETE', url: url + '/:id/groups/:groupId'},
			keys: {method: 'GET', url: url + '/:id/keys', transformResponse:function(jsonString) {
				return  { keys: JSON.parse(jsonString) };
			}},
			build: {method: 'POST', url: url + '/:id/build'}
			
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
	
	.controller('TemplateBuildController', function($state, template, Template) {
		var vm = this;
		vm.template = template;
		
		Template.keys({id:template.id}, function(x) {
			vm.keys = x.keys;
		});
		
		vm.build = function(values) {
			vm.results = Template.build({id:template.id}, values);
		}
		
		vm.download = function() {
			saveTextAs(vm.results.content, vm.template.name + '.txt');
		};
		
	})
	
	;
	
})(angular, window);
