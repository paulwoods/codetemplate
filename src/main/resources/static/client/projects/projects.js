
(function(angular) {
	
	'use strict'
	
	angular
	
	.module('codetemplate')
	
	.config(function($stateProvider) {
		$stateProvider
		.state('projects', {
			url : '/projects',
			templateUrl : 'client/projects/index.html'
		})

		.state('projects.list', {
			url : '/list',
			templateUrl : 'client/projects/list.html',
			controller : 'ProjectListController',
			controllerAs: 'ProjectListController'
		})
		
		.state('projects.create', {
			url : '/create',
			templateUrl : 'client/projects/create.html',
			controller : 'ProjectCreateController',
			controllerAs : 'ProjectCreateController'
		})

		.state('projects.show', {
			url : '/show/:id',
			templateUrl : 'client/projects/show.html',
			controller : 'ProjectShowController',
			controllerAs : 'ProjectShowController',
			resolve: {
				project: function($stateParams, Project) {
					return Project.read({id:$stateParams.id}).$promise;
				},
				groups: function($stateParams, Project) {
					return Project.groups({id:$stateParams.id}).$promise;
				}
			}
		})
		
		.state('projects.edit', {
			url : '/edit/:id',
			templateUrl : 'client/projects/edit.html',
			controller : 'ProjectEditController',
			controllerAs : 'ProjectEditController',
			resolve: {
				project: function($stateParams, Project) {
					return Project.read({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('projects.delete', {
			url : '/delete/:id',
			templateUrl : 'client/projects/delete.html',
			controller : 'ProjectDeleteController',
			controllerAs : 'ProjectDeleteController',
			resolve: {
				project: function($stateParams, Project) {
					return Project.read({id:$stateParams.id}).$promise;
				}
			}
		})

		.state('projects.attach', {
			url : '/attach/:id',
			templateUrl : 'client/projects/attach.html',
			controller : 'ProjectAttachController',
			controllerAs : 'ProjectAttachController',
			resolve: {
				project: function($stateParams, Project) {
					return Project.read({id:$stateParams.id}).$promise;
				},
				groups: function(Group) {
					return Group.list().$promise;
				},
				selected: function($stateParams, Project) {
					return Project.groups({id:$stateParams.id}).$promise;
				},
			}
		})
		
	})
	
	.service("Project", function($resource, api, HalUtils) {
		var url = api + '/projects';
		return $resource(url, {
			id: '@id'
		}, {
			create: {method: 'POST', url: url, interceptor: HalUtils.create},
			read: {method: 'GET', url: url + '/:id', transformResponse: HalUtils.read},
			update: {method: 'PUT', url: url + '/:id'},
			remove: {method: 'DELETE', url: url + '/:id'},
			list: {method: 'GET', url: url, transformResponse: HalUtils.list},
			groups: {method: 'GET', url: url + '/:id/groups', transformResponse: HalUtils.list}
		});
	})
	
	.controller('ProjectCreateController', function() {
	})
	
	.controller('ProjectListController', function(Project) {
		var vm = this;
		vm.projects = Project.list();
	})
	
	.controller('ProjectCreateController', function($state, Project) {
		var vm = this;
		vm.project = new Project();
		
		vm.create = function() {
			vm.project.$create(function() {
				$state.go('^.show', {id: vm.project.id});
			});
		};
	})

	.controller('ProjectShowController', function($stateParams, $q, project, groups, Project, Template) {
		var vm = this;
		vm.sel = {};
		
		vm.project = project;
		vm.groups = groups;
		
		vm.hasSelections = function() {
			return _.has(vm.groups, '_embedded');
		};
		
		vm.numSelections = function() {
			if(angular.isDefined(vm.groups._embedded)) {
				return vm.groups._embedded.groups.length;
			} else {
				return 0;
			}
		};
		
	})
	
	.controller('ProjectEditController', function($state, project) {
		var vm = this;
		vm.project = project;
		
		vm.update = function() {
			project.$update(function() {
				$state.go('^.show', {id:project.id});
			});
		};
	})
	
	.controller('ProjectDeleteController', function($state, project) {
		var vm = this;
		vm.project = project;
		
		vm.delete = function() {
			project.$remove(function() {
				$state.go('^.list');
			});
		};
	})
	
	.controller('ProjectAttachController', function($state, api, project, groups, selected, Group) {
		var vm = this;

		vm.project = project;
		vm.groups = groups;
		vm.selected = selected;

		if(angular.isDefined(vm.groups._embedded)) {
			vm.groupId = vm.groups._embedded.groups[0].id;
		}
		
		if(angular.isDefined(vm.selected._embedded)) {
			vm.selectedId = vm.selected._embedded.groups[0].id;
		}
		
		vm.attach = function() {
			Group.attach({id:vm.groupId}, api + '/projects/' + vm.project.id, function() {
				$state.reload();
			});
		};
		
		vm.detach = function() {
			Group.detach({id:vm.selectedId, projectId:vm.project.id}, function() {
				$state.reload();
			});
		};
		
	})
	
	;
	
})(angular);
