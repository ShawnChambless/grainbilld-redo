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
			cnt.recipe                = RecipeService.recipe;

			cnt.addIngredient    = addIngredient;
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

		function addIngredient(ingredient) {
			switch (cnt.ingredientToShow.name) {
				case 'grain':
					RecipeService.addIngredient('grain', {
						name: ingredient.name,
						amount: cnt.grain.amount,
						lovibond: ingredient.lovibond,
						sg: ingredient.sg
					});
					break;
				case 'hops':
					RecipeService.addIngredient('hops', ingredient);
					break;
				case 'yeast':
					RecipeService.addIngredient('yeast', ingredient);
					break;
					console.log(cnt.recipe)
			}
		}

		function removeGrain(index) {
			RecipeService.recipe.grain.splice(index, 1);
		}

		function removeHops(index) {
			RecipeService.recipe.hops.splice(index, 1);
		}

		function removeYeast(index) {
			RecipeService.recipe.yeast.splice(index, 1);
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


