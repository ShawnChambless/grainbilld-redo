(function() {
	'use strict';

	const express      = require('express'),
				RecipeRouter = express.Router(),
				recipeCtrl   = require('./../controllers/recipeCtrl');

	RecipeRouter
			.get('/community', recipeCtrl.getCommunityRecipes)
			.get('/', recipeCtrl.getRecipeTotals)
			.get('/latest', recipeCtrl.getLatestCommunityRecipes);

	module.exports = RecipeRouter;

}());