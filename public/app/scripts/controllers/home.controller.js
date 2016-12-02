(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.controller('HomeController', homeController);

	homeController.$inject = [ 'HomeService', 'RecipeService', 'latestRecipes' ];

	function homeController(HomeService, RecipeService, latestRecipes) {

		var cnt = this;

		function init() {
			cnt.latestCommunity = latestRecipes;
		}

		init();

		return cnt;

	}
}());