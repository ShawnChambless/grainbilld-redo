(function() {
	'use strict';

	const express          = require('express'),
				IngredientRouter = express.Router(),
				ingredientCtrl   = require('./../controllers/ingredientCtrl');

	IngredientRouter
			.get('/grain', ingredientCtrl.getGrain)
			.post('/grain', ingredientCtrl.addGrain)
			.put('/grain/:_id', ingredientCtrl.updateGrain)
			.get('/hops', ingredientCtrl.getHops)
			.post('/hops', ingredientCtrl.addHops)
			.get('/yeast', ingredientCtrl.getYeast)
			.post('/yeast', ingredientCtrl.addYeast)
			.get('/all', ingredientCtrl.getAllIngredients);

	module.exports = IngredientRouter;

}());


