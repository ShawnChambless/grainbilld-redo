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

		getAllIngredients(req, res) {
			let allIngredients = { grain: [], hops: [], yeast: [] };
			Grain.find({}, 'name lovibond sg lovibond description', (err, grain) => {
				if (err) return res.status(500).json(err);
				allIngredients.grain = grain;

			}).then(() => {

				Hops.find({}, 'name alpha_acid description', (err2, hops) => {
					if (err2) return res.status(500).json(err2);
					allIngredients.hops = hops;
				});

			}).then(() => {

				Yeast.find({}, 'name minimumAttenuation maximumAttenuation', (err3, yeast) => {
					if (err3) return res.status(500).json(err3);
					allIngredients.yeast = yeast;

				}).then(() => {
					return res.status(200).json(allIngredients)
				});

			});
		},

		getGrain(req, res) {
			Grain.find({}).then((err, grain) => {
				responseHandler(res, err, grain);
			});
		},


		addGrain(req, res) {
			let newGrain = new Grain(req.body);
			newGrain.save()
					.then((err, grain) => {
						responseHandler(res, err, grain);
					});
		},

		updateGrain(req, res) {
			Grain.findByIdAndUpdate(req.params._id, req.body, { new: true })
					.then((err, grain) => {
						responseHandler(res, err, grain);
					});
		},

		getHops(req, res) {
			Hops.find({}).then((err, hops) => {
				responseHandler(res, err, hops);
			})
		},

		addHops: function(req, res) {
			let newHops = new Hops(req.body);
			newHops.save()
					.then((err, hops) => {
						responseHandler(res, err, hops);
					});
		},

		getYeast: function(req, res) {
			Yeast.find({})
					.then((err, yeast) => {
						responseHandler(res, err, yeast);
					});
		},

		addYeast: function(req, res) {
			let newYeast = new Yeast(req.body);
			newYeast.save()
					.then((err, yeast) => {
						responseHandler(res, err, yeast);
					});
		}

	};

	function responseHandler(res, err, succ) {
		if (err) return res.status(500).json(err);
		return res.status(200).json(succ);
	}

}());

