(function() {
	'use strict';

	const mongoose    = require('mongoose'),

				yeastSchema = {
					name: { type: String, required: true },
					brand: { type: String, required: true },
					format: { type: String, required: true },
					yeastType: { type: String, default: 'General purpose' },
					origin: { type: String },
					minimumTemperature: { type: Number },
					maximumTemperature: { type: Number },
					flocculation: { type: String },
					minimumAttenuation: { type: Number },
					maximumAttenuation: { type: Number },
					description: { type: String }
				};

	module.exports = new mongoose.Schema(yeastSchema, { collection: 'yeast' });

}());


