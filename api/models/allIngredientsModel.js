var mongoose    = require( 'mongoose' ),
    Grain       = require('./grainModel'),
    Hops        = require('./hopsModel'),
    Yeast       = require('./yeastModel');

var allIngredientsSchema = {
    grain:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'Grain' } ],
    hops:   [ { type: mongoose.Schema.Types.ObjectId, ref: 'Hops' } ],
    yeast:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'Yeast' } ]
};

module.exports = new mongoose.Schema( allIngredientsSchema );
