(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.controller('HomeController', homeController);

	homeController.$inject = [ 'HomeService', 'RecipeService' ];

	function homeController(HomeService, RecipeService) {

		var cnt = this;

		function init() {
			cnt.getLatestCommunity = getLatestCommunity;

			cnt.getLatestCommunity();
		}

		init();


		function getLatestCommunity() {
			RecipeService.getLatestCommunity().then(function(data) {
				$scope.latestCommunity = data;
			});
		}

		return cnt;

	}
}());