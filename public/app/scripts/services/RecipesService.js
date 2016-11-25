(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.service('RecipeService', recipeService);

	recipeService.$inject = [ '$http' ];

	function recipeService($http) {

		return {
			recipe: {
				grain: []
				, hops: []
				, yeast: []
				, name: ''
				, size: 0
			}
			, Grain: Grain
			, Hops: Hops
			, Yeast: Yeast
			, getLatestCommunity: getLatestCommunity
			, addIngredient: addIngredient
			, getAllIngredients: getAllIngredients
			, saveRecipeToUser: saveRecipeToUser
		};

		function Grain(og, fg, srm) {
			this.og  = og;
			this.fg  = fg;
			this.srm = srm;
		}

		function Hops(ibu, boilTime) {
			this.ibu      = ibu;
			this.boilTime = boilTime;
		}

		function Yeast(attenuation) {
			this.attenuation = attenuation;
		}


		function getLatestCommunity() {
			return $http.get('/api/recipes/latest').then(function(data) {
				return data.data;
			});
		}

		function addIngredient(ingredientType, ingredient) {
			switch (ingredientType) {
				case 'grain':
					editGrainInRecipe(ingredient);
					break;
				case 'hops':
					editHopsInRecipe(ingredient);
					break;
				case 'yeast':
					editYeastInRecipe(ingredient);
					break;
			}
		}

		function getAllIngredients() {
			return $http.get('/api/ingredients/all');
		}

		function editGrainInRecipe(grain) {
			grainInRecipe.push({
				name: grain.name,
				lovibond: grain.lovibond,
				sg: ((grain.sg - 1) * 1000).toFixed(1),
				amount: 5,
				description: grain.description
			});
			calcGrainTotals();
		}

		function editHopsInRecipe(hops) {
			hopsInRecipe.push({
				name: hops.name,
				alphaAcid: (hops.alphaAcid / 100),
				amount: 1,
				boilTime: 10,
				description: hops.description
			});
			calcHopsTotals();
		}

		function editYeastInRecipe(yeast) {
			yeastInRecipe.push({
				name: yeast.name,
				attenuation: ((yeast.minimumAttenuation + yeast.maximumAttenuation) / 2),
				description: yeast.description
			});
			calcYeastTotals();
		}

		function calcGrainTotals() {
			var efficiency  = 0.75;
			var batchSize   = 5;
			grainValues.og  = calcOG(batchSize, efficiency);
			grainValues.srm = calcSRM(batchSize);
		}

		function calcHopsTotals() {
			hopsValues.ibu = 0;
			hopsValues.ibu = calcIBU();
		}

		function calcYeastTotals() {
			grainValues.fg  = calcFG(grainValues.og, yeastValues.attenuation);
			yeastValues.abv = calcABV(grainValues.og, grainValues.fg);
		}

		function calcOG(batchSize, efficiency) {
			var grainSg = [];
			grainInRecipe.map(function(item) {
				var sgOfItem = (parseFloat(item.sg) / 1000);
				var totalSg  = (((sgOfItem * item.amount) * efficiency) / batchSize);
				return grainSg.push(totalSg);
			});
			grainSg = grainSg.reduce(function(a, b) {
				return (a + b);
			});
			return (1 + grainSg).toFixed(3);
		}

		function calcFG(og) {
			var fg = yeastInRecipe.map(function(item) {
				var initial = ((og - 1) * (1 - (item.attenuation / 100))) + 1;
				return Math.round(initial * 1000) / 1000;
			});
			return parseFloat(fg);
		}

		function calcSRM(batchSize) {
			var srm = 0;
			srm     = grainInRecipe.map(function(item) {
				var mcu = ((item.lovibond * item.amount) / batchSize);
				return 1.4922 * (Math.pow(mcu, 0.6859));
			}).reduce(function(a, b) {
				return a + b;
			});
			return srm.toFixed(2);
		}

		function calcIBU(hops) {
			var batchSize = 5,
					ibu       = hopsInRecipe.map(function(item) {
						var utilization = findHopUtilization(item.boilTime);
						return parseFloat(((item.alphaAcid * utilization * 74.89 / batchSize) * 100).toFixed(1));
					})
							.reduce(function(a, b) {
								return a + b;
							});
			console.log(hopsInRecipe, ibu);
			return parseFloat(ibu);
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
						grain: this.grainInRecipe,
						hops: this.hopsInRecipe,
						yeast: this.yeastInRecipe,
						batchSize: recipe.batchSize,
						projectedEfficiency: recipe.efficiency,
						isPrivate: recipe.isPrivate
					}
				}
			}).then(function(resp) {
				return (
						this.grainInRecipe = []
								, this.hopsInRecipe = []
								, this.yeastInRecipe = []
								, resp.data
				);
			}.bind(this));
		}
	}

}());


