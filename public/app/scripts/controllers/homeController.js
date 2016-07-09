(function() {
	'use strict';

	angular.module('GrainBilld')
	.controller('HomeController', function($scope, HomeService, RecipeService) {

		var $parent = this;

		$parent.init = function() {
			$parent.getLatestCommunity();
		};

		$parent.getLatestCommunity = function() {
			RecipeService.getLatestCommunity().then(function(data) {
				$scope.latestCommunity =  data;
			});
		};

		$parent.init();
		
	});
}());