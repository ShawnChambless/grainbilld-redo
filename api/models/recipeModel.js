(function() {
	'use strict';

	const mongoose     = require('mongoose'),
				User         = require('./userModel'),

				recipeSchema = {
					user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
					name: { type: String },
					grain: { type: Object },
					hops: { type: Object },
					yeast: { type: Object },
					batchSize: { type: Number },
					projectedEfficiency: { type: Number },
					actualEfficiency: { type: Number },
					isPrivate: { type: Boolean, default: true },
					dateCreated: { type: String, default: Date.now() }
				};

	module.exports = new mongoose.Schema(recipeSchema);

}());


