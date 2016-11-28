(function() {
	'use strict';

	const express      = require('express'),
				RecipeRouter = express.Router(),
				RecipeCtrl   = require('./../controllers/RecipeCtrl');

	RecipeRouter
			.get('/community', RecipeCtrl.getCommunityRecipes)
			.get('/', RecipeCtrl.getRecipeTotals)
			.get('/latest', RecipeCtrl.getLatestCommunityRecipes);

	module.exports = RecipeRouter;

}());