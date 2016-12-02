(function() {
	'use strict';

	const express    = require('express'),
			UserRouter = express.Router(),
			userCtrl   = require('./../controllers/userCtrl'),
			recipeCtrl = require('./../controllers/recipeCtrl');


	UserRouter
			.post('/api/users', userCtrl.createUser)
			.get('/api/users/getUser', userCtrl.getCurrentUser)
			.get('/api/user/recipes/:userId', userCtrl.getRecipes)
			.put('/api/user/recipes/removeUser', recipeCtrl.removeRecipe)
			.put('/api/users/:user_id', userCtrl.updateUser)
			.post('/api/users/newRecipe', recipeCtrl.newRecipe)
			.delete('/api/users/favorites/remove:id', userCtrl.removeFavorite)
			.delete('/api/users/:user_id', userCtrl.removeUser);

	module.exports = UserRouter;

}());
