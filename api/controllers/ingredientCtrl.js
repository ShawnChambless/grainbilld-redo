var mongoose = require('mongoose'),
    User     = mongoose.model('User', require('../models/userModel')),
    Grain    = mongoose.model('Grain', require('../models/grainModel')),
    Hops     = mongoose.model('Hops', require('../models/hopsModel')),
    Yeast    = mongoose.model('Yeast', require('../models/yeastModel')),
    Recipe   = mongoose.model('Recipe', require('../models/recipeModel')),
    AllIngredients = mongoose.model('AllIngredients', require('../models/allIngredientsModel'));

module.exports = {

    getAllIngredients: function (req, res) {
        Grain.find({}, 'name lovibond sg lovibond description', function (err, grain) {
            if (err) return res.status(500).json(err);

            Hops.find({}, 'name alpha_acid description', function (err2, hops) {
                if (err2) return res.status(500).json(err2);


							Yeast.find({}, 'name minimumAttenuation maximumAttenuation', function (err3, yeast) {
                    if (err3) return res.status(500).json(err3);

								return res.status(200).json({grain: grain, hops: hops, yeast: yeast});
                });

            });
        })
    }

};