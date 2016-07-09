angular.module('GrainBilld', ['ui.router', 'ngMaterial', 'ngAnimate'])

.run(function() {
	if ('addEventListener' in document) {
	    document.addEventListener('DOMContentLoaded', function() {
	        FastClick.attach(document.body);
	    }, false);
	}
})

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {

	$mdThemingProvider
		.theme('default')
		.primaryPalette('light-blue')
		.accentPalette('teal', {
			'default': '300'
		})
		.warnPalette('red');

	$urlRouterProvider.otherwise('/Home');

	$stateProvider

		.state('home', {
		  url: '/Home',
		  controller: 'HomeController as cnt',
		  template: '<home-dir></home-dir>'
		})
		.state('newBeer', {
			url: '/NewBeer',
			controller: 'NewBeerController as cnt',
			template: '<new-beer-dir></new-beer-dir>',
			resolve: {
				getIngredients: function(RecipeService) {
					return RecipeService.getAllIngredients().then(function(data) {
						return data.data;

					});
				}
			}
		});

});
