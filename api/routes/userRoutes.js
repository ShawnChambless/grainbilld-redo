(function() {
	'use strict';

	const express    = require('express'),
			UserRouter = express.Router(),
			userCtrl   = require('./../controllers/userCtrl'),
			recipeCtrl = require('./../controllers/recipeCtrl');


	UserRouter
			.post('/api/users', userCtrl.create)
			.get('/api/users/getUser', userCtrl.getCurrentUser)
			.get('/api/user/recipes/:userId', userCtrl.getRecipes)
			.put('/api/user/recipes/remove', recipeCtrl.removeRecipe)
			.put('/api/users/:user_id', userCtrl.update)
			.post('/api/users/newRecipe', recipeCtrl.newRecipe)
			.delete('/api/users/:user_id', userCtrl.remove);

	module.exports = UserRouter;

}());
