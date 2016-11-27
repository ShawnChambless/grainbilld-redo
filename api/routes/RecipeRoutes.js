var express      = require('express'),
		RecipeRouter = express.Router(),
		RecipeCtrl   = require('./../controllers/RecipeCtrl');

RecipeRouter
		.get('/api/recipes/community', RecipeCtrl.getCommunityRecipes)
		.get('/api/recipes', RecipeCtrl.getRecipeTotals)
		.get('/api/recipes/latest', RecipeCtrl.getLatestCommunityRecipes);

module.exports = RecipeRouter;