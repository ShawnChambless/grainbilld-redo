(function() {
	"use strict";

	angular
			.module('GrainBilld')
			.controller('NewBeerController', newBeerController);

	newBeerController.$inject = [ 'RecipeService', 'getIngredients', '$timeout' ];

	function newBeerController(RecipeService, getIngredients, $timeout) {

		var cnt = this;

		function init() {
			cnt.grainInDb             = getIngredients.grain;
			cnt.hopsInDb              = getIngredients.hops;
			cnt.yeastInDb             = getIngredients.yeast;
			cnt.ingredientToShow      = { name: 'grain', arr: cnt.grainInDb };
			cnt.updateIngredientShown = updateIngredientShown;
			cnt.showGrainData         = showGrainData;
			cnt.showHopsData          = showHopsData;
			cnt.showYeastData         = showYeastData;
			cnt.grainInRecipe         = RecipeService.grainInRecipe;
			cnt.hopsInRecipe          = RecipeService.hopsInRecipe;
			cnt.yeastInRecipe         = RecipeService.yeastInRecipe;
			cnt.grainValues           = RecipeService.grainValues;
			cnt.hopsValues            = RecipeService.hopsValues;
			cnt.yeastValues           = RecipeService.yeastValues;
			RecipeService.recipe.grain.push({grain: cnt.grainInDb[0], amount: 10});
			RecipeService.recipe.hops.push({hops: cnt.hopsInDb[0], amount: 45});
			cnt.recipe                = RecipeService.recipe;
			cnt.recipe.isPrivate      = true;


			cnt.removeGrain      = removeGrain;
			cnt.removeHops       = removeHops;
			cnt.removeYeast      = removeYeast;
			cnt.saveRecipeToUser = saveRecipeToUser;

			cnt.updateIngredientShown();
		}

		init();

		function showGrainData() {
			cnt.ingredientToShow.arr  = cnt.grainInDb;
			cnt.ingredientToShow.name = 'grain';
			cnt.updateIngredientShown();
		}

		function showHopsData() {
			cnt.ingredientToShow.arr  = cnt.hopsInDb;
			cnt.ingredientToShow.name = 'hops';
			cnt.updateIngredientShown();
		}

		function showYeastData() {
			cnt.ingredientToShow.arr  = cnt.yeastInDb;
			cnt.ingredientToShow.name = 'yeast';
			cnt.updateIngredientShown();
		}

		function removeGrain(index) {
			RecipeService.grainInRecipe.splice(index, 1);
		}

		function removeHops(index) {
			RecipeService.hopsInRecipe.splice(index, 1);
		}

		function removeYeast(index) {
			RecipeService.yeastInRecipe.splice(index, 1);
		}

		function updateIngredientShown() {
			cnt.showGrain ? cnt.ingredientToShow.name = 'grain' : false;
			cnt.showHops ? cnt.ingredientToShow.name = 'hops' : false;
			cnt.showYeast ? cnt.ingredientToShow.name = 'yeast' : false;
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


