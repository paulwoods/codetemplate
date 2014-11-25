
(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('groups', {
			url : '/groups',
			templateUrl : 'client/groups/index.html'
		})

		.state('groups.list', {
			url : '/list',
			templateUrl : 'client/groups/list.html',
			controller : 'GroupListController',
			controllerAs: 'GroupListController'
		})
		
		.state('groups.create', {
			url : '/create',
			templateUrl : 'client/groups/create.html',
			controller : 'GroupCreateController',
			controllerAs : 'GroupCreateController'
		})

		.state('groups.show', {
			url : '/show/:id',
			templateUrl : 'client/groups/show.html',
			controller : 'GroupShowController',
			controllerAs : 'GroupShowController',
			resolve: {
				group: function($stateParams, Group) {
					return Group.read({id:$stateParams.id}).$promise;
				},
				templates: function($stateParams, Group) {
					return Group.templates({id:$stateParams.id}).$promise;
				},
				projects: function($stateParams, Group) {
					return Group.projects({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('groups.edit', {
			url : '/edit/:id',
			templateUrl : 'client/groups/edit.html',
			controller : 'GroupEditController',
			controllerAs : 'GroupEditController',
			resolve: {
				group: function($stateParams, Group) {
					return Group.read({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('groups.delete', {
			url : '/delete/:id',
			templateUrl : 'client/groups/delete.html',
			controller : 'GroupDeleteController',
			controllerAs : 'GroupDeleteController',
			resolve: {
				group: function($stateParams, Group) {
					return Group.read({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('groups.attach', {
			url : '/attach/:id',
			templateUrl : 'client/groups/attach.html',
			controller : 'GroupAttachController',
			controllerAs : 'GroupAttachController',
			resolve: {
				group: function($stateParams, Group) {
					return Group.read({id:$stateParams.id}).$promise;
				},
				templates: function(Template) {
					return Template.list().$promise;
				},
				selected: function($stateParams, Group) {
					return Group.templates({id:$stateParams.id}).$promise;
				},
			}
		})
		
	})
	
	.service("Group", function($resource, api, HalUtils) {
		var url = api + '/groups';
		return $resource(url, {
			id: '@id',
			templateId: '@templateId'
		}, {
			create: {method: 'POST', url: url, interceptor: HalUtils.create},
			read: {method: 'GET', url: url + '/:id', transformResponse: HalUtils.read},
			update: {method: 'PUT', url: url + '/:id'},
			remove: {method: 'DELETE', url: url + '/:id'},
			list: {method: 'GET', url: url, transformResponse: HalUtils.list},
			templates: {method: 'GET', url: url + '/:id/templates', transformResponse: HalUtils.list},
			projects: {method: 'GET', url: url + '/:id/projects', transformResponse: HalUtils.list},
			attach: {method: 'PUT', url: url + '/:id/projects', headers: { 'Content-Type': 'text/uri-list;charset=utf-8' }},
			detach: {method: 'DELETE', url: url + '/:id/projects/:projectId'}
		});
	})
	
	.controller('GroupCreateController', function(Group) {
		var vm = this;
		vm.group = new Group();
		
		vm.create = function() {
			vm.group.$create(function(group) {
				$state.go('^.show', {id: vm.group.id});
			});
		};
	})
	
	.controller('GroupListController', function(Group) {
		var vm = this;
		vm.groups = Group.list();
	})
	
	.controller('GroupCreateController', function($state, Group) {
		var vm = this;
		vm.group = new Group();
		
		vm.create = function() {
			vm.group.$create(function() {
				$state.go('^.show', {id: vm.group.id});
			});
		};
	})

	.controller('GroupShowController', function($stateParams, $q, group, templates, projects, Group, Template) {
		var vm = this;
		vm.sel = {};
		vm.group = group;
		vm.templates = templates;
		vm.projects = projects;
		
		vm.hasSelections = function() {
			return _.has(vm.templates, '_embedded');
		};
		
		vm.numTemplateSelections = function() {
			if(angular.isDefined(vm.templates._embedded)) {
				return vm.templates._embedded.templates.length;
			} else {
				return 0;
			}
		};
		
	})
	
	.controller('GroupEditController', function($state, group) {
		var vm = this;
		vm.group = group;
		
		vm.update = function() {
			group.$update(function() {
				$state.go('^.show', {id:group.id});
			});
		};
	})
	
	.controller('GroupDeleteController', function($state, group) {
		var vm = this;
		vm.group = group;
		
		vm.delete = function() {
			group.$remove(function() {
				$state.go('^.list');
			});
		};
	})
	
	.controller('GroupAttachController', function($state, api, group, templates, selected, Template) {
		var vm = this;

		vm.group = group;
		vm.templates = templates;
		vm.selected = selected;
		
		vm.attach = function() {
			Template.attach({id:vm.templateId}, api + '/groups/' + vm.group.id, function() {
				$state.reload();
			});
		};
		
		vm.detach = function() {
			Template.detach({id:vm.selectedId, groupId:vm.group.id}, function() {
				$state.reload();
			});
		};
		
	})
	
	;
	
})(angular);
