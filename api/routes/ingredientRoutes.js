(function() {
	'use strict';

	const express          = require('express'),
				IngredientRouter = express.Router(),
				IngredientCtrl   = require('./../controllers/IngredientCtrl');

	IngredientRouter
			.get('/grain', IngredientCtrl.getGrain)
			.post('/grain', IngredientCtrl.addGrain)
			.put('/grain/:_id', IngredientCtrl.updateGrain)
			.get('/hops', IngredientCtrl.getHops)
			.post('/hops', IngredientCtrl.addHops)
			.get('/yeast', IngredientCtrl.getYeast)
			.post('/yeast', IngredientCtrl.addYeast)
			.get('/all', IngredientCtrl.getAllIngredients);

	module.exports = IngredientRouter;

}());


