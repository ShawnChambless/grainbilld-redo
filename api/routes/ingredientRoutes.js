(function() {
	'use strict';

	const express          = require('express'),
				IngredientRouter = express.Router(),
				ingredientCtrl   = require('./../controllers/ingredientCtrl');

	IngredientRouter
			.get('/grain', ingredientCtrl.getGrain)
			.get('/hops', ingredientCtrl.getHops)
			.get('/yeast', ingredientCtrl.getYeast)
			.get('/all', ingredientCtrl.getAllIngredients)

			.put('/grain/:_id', ingredientCtrl.updateGrain)

			.post('/grain', ingredientCtrl.addGrain)
			.post('/hops', ingredientCtrl.addHops)
			.post('/yeast', ingredientCtrl.addYeast);

	module.exports = IngredientRouter;

}());


