(function() {
	'use strict';

	angular
			.module('GrainBilld', [ 'ui.router', 'infinite-scroll', 'ngSanitize' ])
			.run(run)
			.config(config);

	config.$inject = [ '$stateProvider', '$urlRouterProvider' ];

	function run() {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	}

	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
				.otherwise('/Home');

		$stateProvider

				.state('home', {
					url: '/Home'
					, controller: 'HomeController as cnt'
					, templateUrl: 'app/templates/home.template.html'
					, resolve: {
						latestRecipes: function(RecipeService) {
							return RecipeService.getLatestCommunity()
									.then(function(data) {
										return data.data;
									})
						}
					}
				})

				.state('newBeer', {
					url: '/NewBeer'
					, controller: 'NewBeerController as cnt'
					, templateUrl: 'app/templates/newBeer.template.html'
					, resolve: {
						getIngredients: function(IngredientsService) {
							return IngredientsService.getAllIngredients()
									.then(function(data) {
										return data;
									});
						}
					}
				})

				.state('profile', {
					url: '/Profile'
					, controller: 'UserController as cnt'
					, templateUrl: 'app/templates/user.template.html'
					, resolve: {
						user: function(UserService) {
							return UserService.getUser()
									.then(function(data) {
										return data.data;
									});
						}
					}
				});

	}

}());

