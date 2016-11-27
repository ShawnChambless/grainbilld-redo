(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.service('RecipeService', recipeService);

	recipeService.$inject = [ '$http' ];

	function recipeService($http) {
		var recipe = {
			name: ''
			, size: 5
			, grain: []
			, hops: []
			, yeast: []
			, ibu: 0
			, srm: 0
			, og: 0
			, fg: 0
			, efficiency: 0.75
			, abv: 0
			, isPrivate: true
		};

		return {
			recipe: recipe
			, getLatestCommunity: getLatestCommunity
			, addIngredient: addIngredient
			, getAllIngredients: getAllIngredients
			, saveRecipeToUser: saveRecipeToUser
		};

		function getLatestCommunity() {
			return $http.get('/api/recipes/latest').then(function(data) {
				return data.data;
			});
		}

		function addIngredient(ingredientType, ingredient) {
			switch (ingredientType) {
				case 'grain':
					addGrainToRecipe(ingredient);
					break;
				case 'hops':
					addHopsToRecipe(ingredient);
					break;
				case 'yeast':
					addYeastToRecipe(ingredient);
					break;
			}
			console.log(recipe)
		}

		function getAllIngredients() {
			return $http.get('/api/ingredients/all');
		}

		function addGrainToRecipe(grain) {
			recipe.grain.push(grain);
			calcGrainTotals();
		}

		function addHopsToRecipe(hops) {
			recipe.hops.push(hops);
			calcHopsTotals();
		}

		function addYeastToRecipe(yeast) {
			recipe.yeast.push(yeast);
			calcYeastTotals();
		}

		function calcGrainTotals() {
			recipe.og  = calcOG();
			recipe.srm = calcSRM(recipe.size);
		}

		function calcHopsTotals() {
			recipe.ibu = 0;
			recipe.ibu = calcIBU();
		}

		function calcYeastTotals() {
			recipe.fg  = calcFG(recipe.og);
			recipe.abv = calcABV(recipe.og, recipe.fg);
		}

		function calcOG() {
			var grainSg = [];
			_.map(recipe.grain, (function(item) {
				var sgOfItem = (parseFloat(item.sg) / 1000);
				var totalSg  = (((sgOfItem * item.amount) * recipe.efficiency) / recipe.size);
				return grainSg.push(totalSg);
			}));
			var final = grainSg.reduce(function(a, b) {
				return (a + b);
			});
			return (1 + final).toFixed(3);
		}

		function calcFG(og) {
			var fg = recipe.yeast.map(function(item) {
				var initial = ((og - 1) * (1 - (item.attenuation / 100))) + 1;
				return Math.round(initial * 1000) / 1000;
			});
			return parseFloat(fg);
		}

		function calcSRM() {
			return recipe.grain.map(function(item) {
				var mcu = ((item.lovibond * item.amount) / recipe.size);
				return 1.4922 * (Math.pow(mcu, 0.6859));
			}).reduce(function(a, b) {
				return a + b;
			}).toFixed(2);
		}

		function calcIBU() {
			return parseFloat(recipe.hops.map(function(item) {
				var utilization = findHopUtilization(item.boilTime);
				return parseFloat(((item.alphaAcid * utilization * 74.89 / recipe.size) * 100).toFixed(1));
			})
					.reduce(function(a, b) {
						return a + b;
					}));
		}

		function calcABV(og, fg) {
			return ((og - fg) * 131).toFixed(2);
		}

		function findHopUtilization(boilTime) {
			var hopUtilization = 0;
			if (boilTime === 0) hopUtilization = 0;
			else if (boilTime > 0 && boilTime <= 9) hopUtilization = 0.05;
			else if (boilTime > 9 && boilTime <= 19) hopUtilization = 0.12;
			else if (boilTime > 19 && boilTime <= 29) hopUtilization = 0.15;
			else if (boilTime > 29 && boilTime <= 44) hopUtilization = 0.19;
			else if (boilTime > 44 && boilTime <= 59) hopUtilization = 0.22;
			else if (boilTime > 59 && boilTime <= 74) hopUtilization = 0.24;
			else if (boilTime > 74) hopUtilization = 0.27;
			return hopUtilization;
		}

		function saveRecipeToUser(recipe, user) {
			return $http({
				method: 'POST',
				url: 'api/users/newRecipe',
				data: {
					recipe: {
						user: user,
						name: recipe.name,
						grain: recipe.grain,
						hops: recipe.hops,
						yeast: recipe.yeast,
						batchSize: recipe.batchSize,
						projectedEfficiency: recipe.efficiency,
						isPrivate: recipe.isPrivate
					}
				}
			}).then(function(resp) {
				return (
						recipe.grain = []
								, recipe.hops = []
								, recipe.yeast = []
								, resp.data
				);
			}.bind(this));
		}
	}

}());


