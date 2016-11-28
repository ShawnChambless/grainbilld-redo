(function() {
	'use strict';

	const mongoose       = require('mongoose'),
				User           = mongoose.model('User', require('../models/userModel')),
				Grain          = mongoose.model('Grain', require('../models/grainModel')),
				Hops           = mongoose.model('Hops', require('../models/hopsModel')),
				Yeast          = mongoose.model('Yeast', require('../models/yeastModel')),
				Recipe         = mongoose.model('Recipe', require('../models/recipeModel')),
				AllIngredients = mongoose.model('AllIngredients', require('../models/allIngredientsModel'));

	mongoose.Promise = global.Promise;

	module.exports = {

		newRecipe(req, res) {
			let recipeId
					, recipeName;
			Recipe.create(req.body.recipe).then((err, newRecipe) => {
				if (err) return res.status(500).json(err);
				recipeId   = newRecipe._id;
				recipeName = newRecipe.name;
			});
			User.findById(req.body.recipe.user).then((err, user) => {
				user.recipes.push(recipeId);
				user.save(function(err) {
					return res.status(200).json(recipeName + ' saved!');
				});
			});
		},

		getCommunityRecipes(req, res) {
			Recipe.find({})
					.where('isPrivate').equals(false)
					.exec().then((err, recipes) => {
				responseHandler(res, err, recipes);
			});
		},

		getLatestCommunityRecipes(req, res) {
			Recipe.find({})
					.where('isPrivate').equals(false)
					.sort('dateCreated')
					.limit(5)
					.exec().then((err, recipes) => {
				responseHandler(res, err, recipes);
			});
		},

		getRecipeTotals(req, res) {
			Recipe.find({})
					.exec().then((err, resp) => {
				if (err) return res.status(500).json(err);
				let totalCommunity = 0;
				resp.forEach(function(item) {
					if (!item.isPrivate) totalCommunity++;
				});
				return res.status(200).json({ totalCount: resp.length, totalCommunity: totalCommunity });
			});
		},

		removeRecipe(req, res) {
			Recipe.findByIdAndRemove(req.body.recipeId).then((err, resp) => {
				if (err) return res.status(500).json(err);
				console.log(resp);
				User.findByIdAndUpdate(resp.user, { $pull: { recipes: req.body.recipeId } }, { new: true }, function(err, resp) {
					responseHandler(res, err, resp);
				});
			});
		}
	};

	function responseHandler(res, err, succ) {
		if (err) return res.status(500).json(err);
		return res.status(200).json(succ);
	}

}());

