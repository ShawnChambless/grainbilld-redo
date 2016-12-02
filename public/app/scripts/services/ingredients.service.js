(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.factory('IngredientService', ingredientService);

	ingredientService.$inject = [ '$http' ];

	function ingredientService($http) {
		return {
			ingredients: {}
			, getAllIngredients: getAllIngredients
		};

		function getAllIngredients() {
			return $http.get('/api/ingredients/all')
					.then(function(ingredients) {
						this.ingredients = ingredients.data;
					});
		}

	}

}());