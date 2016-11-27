(function() {
	"use strict";

	angular
			.module('GrainBilld')
			.controller('NewBeerController', newBeerController);

	newBeerController.$inject = [ '$scope', 'RecipeService', 'getIngredients', '$timeout' ];

	function newBeerController($scope, RecipeService, getIngredients, $timeout) {

		var cnt = this;

		cnt.init = init;

		cnt.init();

		function init() {
			cnt.grainInDb             = getIngredients.grain;
			cnt.hopsInDb              = getIngredients.hops;
			cnt.yeastInDb             = getIngredients.yeast;
			cnt.initialGrainsToShow   = getIngredients.grain.slice(0, 9);
			cnt.initialHopsToShow     = getIngredients.hops.slice(0, 9);
			cnt.initialYeastToShow    = getIngredients.yeast.slice(0, 9);
			cnt.ingredientToShow      = { name: 'grain', arr: cnt.initialGrainsToShow };
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
			cnt.loadMore              = loadMore;

			cnt.updateIngredientShown();
			formatArrays();
			setInitialIngredientsToShow();



			$scope.$watch(function() {
				cnt.recipeHasIngredients = cnt.recipe.grain.length || cnt.recipe.hops.length || cnt.recipe.yeast.length;
				return cnt.recipeHasIngredients;
			});

		}

		function showGrainData() {
			setInitialIngredientsToShow();
			cnt.ingredientToShow.arr  = cnt.initialGrainsToShow;
			cnt.ingredientToShow.name = 'grain';
			cnt.showGrainInRecipe     = true;
			cnt.showHopsInRecipe      = cnt.showYeastInRecipe = false;
			cnt.updateIngredientShown();
		}

		function showHopsData() {
			setInitialIngredientsToShow();
			cnt.ingredientToShow.arr  = cnt.initialHopsToShow;
			cnt.ingredientToShow.name = 'hops';
			cnt.showHopsInRecipe      = true;
			cnt.showGrainInRecipe     = cnt.showYeastInRecipe = false;
			cnt.updateIngredientShown();
		}

		function showYeastData() {
			setInitialIngredientsToShow();
			cnt.ingredientToShow.arr  = cnt.initialYeastToShow;
			cnt.ingredientToShow.name = 'yeast';
			cnt.showYeastInRecipe     = true;
			cnt.showGrainInRecipe     = cnt.showGrainInRecipe = false;
			cnt.updateIngredientShown();
		}

		function setInitialIngredientsToShow() {
			cnt.initialGrainsToShow   = getIngredients.grain.slice(0, 9);
			cnt.initialHopsToShow     = getIngredients.hops.slice(0, 9);
			cnt.initialYeastToShow    = getIngredients.yeast.slice(0, 9);
		}

		function formatArrays() {
			_.forEach(cnt.grainInDb, function(item) {
				item.specs = [];
				_.unset(item, '_id');
				_.forIn(item, function(val, key) {
					if(key != 'specs' && key != 'name') item.specs.push(_.capitalize(key) + ': ' + val)
				});
			});
			console.log(cnt.grainInDb[0])
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

		function loadMore() {
			var arr             = cnt.ingredientToShow.arr;
			var nextIngredients = [];
			switch (cnt.ingredientToShow.name) {
				case 'grain':
					nextIngredients = cnt.grainInDb.slice(arr.length, (cnt.grainInDb.length - arr.length + 9));
					break;
				case 'hops':
					nextIngredients = cnt.hopsInDb.slice(arr.length, (cnt.hopsInDb.length - arr.length + 9));
					break;
				case 'yeast':
					nextIngredients = cnt.yeastInDb.slice(arr.length, (cnt.yeastInDb.length - arr.length + 9));
					break;
			}

			cnt.ingredientToShow.arr.push(nextIngredients);
			return cnt.ingredientToShow.arr = cnt.ingredientToShow.arr.reduce(function(a, b) {
				return a.concat(b);
			}, []);
		}

		return cnt;
	}

}());


