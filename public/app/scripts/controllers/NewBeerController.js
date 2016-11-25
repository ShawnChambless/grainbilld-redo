(function() {
	"use strict";

	angular
			.module('GrainBilld')
			.controller('NewBeerController', newBeerController);

	newBeerController.$inject = [ 'RecipeService', 'getIngredients', '$timeout' ];

	function newBeerController(RecipeService, getIngredients, $timeout) {

		var cnt = this;

		function init() {
			console.log(getIngredients);

			cnt.ingredientToShow = [];
			cnt.grainInDb        = getIngredients.grain;
			cnt.hopsInDb         = getIngredients.hops;
			cnt.yeastInDb        = getIngredients.yeast;
			cnt.grainInRecipe    = RecipeService.grainInRecipe;
			cnt.hopsInRecipe     = RecipeService.hopsInRecipe;
			cnt.yeastInRecipe    = RecipeService.yeastInRecipe;
			cnt.grainValues      = RecipeService.grainValues;
			cnt.hopsValues       = RecipeService.hopsValues;
			cnt.yeastValues      = RecipeService.yeastValues;
			cnt.recipe           = {};
			cnt.recipe.isPrivate = true;

			cnt.removeGrain      = removeGrain;
			cnt.removeHops       = removeHops;
			cnt.removeYeast      = removeYeast;
			cnt.saveRecipeToUser = saveRecipeToUser;

		}

		init();

		function removeGrain(index) {
			RecipeService.grainInRecipe.splice(index, 1);
		}

		function removeHops(index) {
			RecipeService.hopsInRecipe.splice(index, 1);
		}

		function removeYeast(index) {
			RecipeService.yeastInRecipe.splice(index, 1);
		}

		function saveRecipeToUser(recipe) {
			var user = $scope.currentUser.id;
			RecipeService.saveRecipeToUser(recipe, user).then(function(resp) {
				console.log(resp);
			});
		}

		return cnt;
	}

}());


