(function() {
	'use strict';

	const express    = require('express'),
			UserRouter = express.Router(),
			userCtrl   = require('./../controllers/userCtrl'),
			recipeCtrl = require('./../controllers/recipeCtrl');


	UserRouter
			.get('/api/user/recipes/:userId', userCtrl.getRecipes)
			.get('/api/users/getUser', userCtrl.getCurrentUser)

			.put('/api/user/recipes/removeUser', recipeCtrl.removeRecipe)
			.put('/api/users/:user_id', userCtrl.updateUser)

			.post('/api/users', userCtrl.createUser)
			.post('/api/users/newRecipe', recipeCtrl.newRecipe)

			.delete('/api/users/favorites/remove:id', userCtrl.removeFavorite)
			.delete('/api/users/:user_id', userCtrl.removeUser);

	module.exports = UserRouter;

}());
