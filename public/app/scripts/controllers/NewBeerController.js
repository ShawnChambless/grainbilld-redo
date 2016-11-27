(function() {
	"use strict";

	angular
			.module('GrainBilld')
			.controller('NewBeerController', newBeerController);

	newBeerController.$inject = [ '$scope', 'RecipeService', 'getIngredients', '$timeout' ];

	function newBeerController($scope, RecipeService, getIngredients, $timeout) {

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
			cnt.recipeHasIngredients  = false;
			cnt.addIngredient         = addIngredient;
			cnt.removeGrain           = removeGrain;
			cnt.removeHops            = removeHops;
			cnt.removeYeast           = removeYeast;
			cnt.saveRecipeToUser      = saveRecipeToUser;

			cnt.updateIngredientShown();


			$scope.$watch(function() {
				cnt.recipeHasIngredients = cnt.recipe.grain.length || cnt.recipe.hops.length || cnt.recipe.yeast.length;
				return cnt.recipeHasIngredients;
			});

		}

		init();



		function showGrainData() {
			cnt.ingredientToShow.arr  = cnt.grainInDb;
			cnt.ingredientToShow.name = 'grain';
			cnt.showGrainInRecipe     = true;
			cnt.showHopsInRecipe      = cnt.showYeastInRecipe = false;
			cnt.updateIngredientShown();
		}

		function showHopsData() {
			cnt.ingredientToShow.arr  = cnt.hopsInDb;
			cnt.ingredientToShow.name = 'hops';
			cnt.showHopsInRecipe      = true;
			cnt.showGrainInRecipe     = cnt.showYeastInRecipe = false;
			cnt.updateIngredientShown();
		}

		function showYeastData() {
			cnt.ingredientToShow.arr  = cnt.yeastInDb;
			cnt.ingredientToShow.name = 'yeast';
			cnt.showYeastInRecipe     = true;
			cnt.showGrainInRecipe     = cnt.showGrainInRecipe = false;
			cnt.updateIngredientShown();
		}

		function addIngredient(ingredient) {
			switch (cnt.ingredientToShow.name) {
				case 'grain':
					RecipeService.addIngredient('grain', new Grain(ingredient.name, ingredient.lovibond, ingredient.sg, cnt.grain.amount));
					break;
				case 'hops':
					RecipeService.addIngredient('hops', new Hops(ingredient.name, ingredient.alphaAcid, cnt.hops.boilTime, cnt.hops.amount));
					break;
				case 'yeast':
					RecipeService.addIngredient('yeast', new Yeast(ingredient.name, (ingredient.maximumAttenuation + ingredient.minimumAttenuation) / 2));
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

		function Grain(name, lovibond, sg, amount) {
			this.name     = name;
			this.lovibond = lovibond;
			this.sg       = sg;
			this.amount   = amount;
		}

		function Hops(name, alphaAcid, boilTime, amount) {
			this.name      = name;
			this.alphaAcid = alphaAcid;
			this.boilTime  = boilTime;
			this.amount    = amount;
		}

		function Yeast(name, attenuation) {
			this.name        = name;
			this.attenuation = attenuation;
		}

		return cnt;
	}

}());


