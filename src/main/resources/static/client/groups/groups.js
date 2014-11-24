
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
				template: function($stateParams, Group) {
					return Group.read({id:$stateParams.id});
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
					return Group.read({id:$stateParams.id});
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
					return Group.read({id:$stateParams.id});
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
					return Group.read({id:$stateParams.id});
				},
				templates: function(Template) {
					return Template.list();
				},
				selected: function($stateParams, Group) {
					return Group.templates({id:$stateParams.id});
				},
			}
		})
		
	})
	
	.service("Group", function($resource, api, HalUtils) {
		var url = api + '/groups';
		return $resource(url, {
			id: '@id'
		}, {
			create: {method: 'POST', url: url, interceptor: HalUtils.create},
			read: {method: 'GET', url: url + '/:id', transformResponse: HalUtils.read},
			update: {method: 'PUT', url: url + '/:id'},
			remove: {method: 'DELETE', url: url + '/:id'},
			list: {method: 'GET', url: url, transformResponse: HalUtils.list},
			templates: {method: 'GET', url: url + '/:id/templates', transformResponse: HalUtils.list},
		});
	})
	
	.controller('GroupCreateController', function() {
	})
	
	.controller('GroupListController', function(Group) {
		var vm = this;
		vm.groups = Group.list();
	})
	
	.controller('GroupCreateController', function($state, Group) {
		var vm = this;
		vm.group = new Group();
		
		vm.create = function() {
			console.log('create', vm.group);
			
			vm.group.$create(function() {
				$state.go('^.show', {id: vm.group.id});
			});
		};
	})

	.controller('GroupShowController', function($stateParams, $q, Group, Template) {
		var vm = this;
		vm.sel = {};
		
		vm.group = Group.read({id:$stateParams.id});
		vm.selected = Group.templates({id:$stateParams.id});
		
		vm.hasSelections = function() {
			return _.has(vm.selected, '_embedded');
		};
		
		vm.numSelections = function() {
			if(angular.isDefined(vm.selected._embedded)) {
				return vm.selected._embedded.templates.length;
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
