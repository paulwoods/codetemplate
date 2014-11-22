(function(angular, api) {
	
	'use strict';
	
	angular
	
	.module('codetemplate', [		
		'ngResource',
		'ui.router'
	])

	.constant('api', api)

	.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	})
	
	
	.factory('HalUtils', function() {
		
		function parseUrlId(url) {
			var pos = url.lastIndexOf('/');
			return parseInt(url.substr(pos+1), 10);
		}
		
		function parseId(json) {
			json.id = parseUrlId(json._links.self.href);
			return json;
		}
		
		return {
			
			create: { response: function(response) {
				response.resource.id = parseUrlId(response.headers("Location"));
			}},
			
			/**
			 * add the id number to the object
			 */ 
			read: function(jsonString) {
				return parseId(JSON.parse(jsonString));
			},

			/**
			 * add the id number to the object
			 */
			list: function(jsonString) {
				var json = JSON.parse(jsonString)
				_.each(json._embedded.templates, parseId);
				return json;
			}
		}
	})
	
	;
	
})(angular, api);