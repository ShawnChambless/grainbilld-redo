var mongoose = require('mongoose'),
    Grain = mongoose.model('Grain', require('../models/grainModel'));

module.exports = {
    addGrain: function(req, res) {
        newGrain = new Grain(req.body);
        newGrain.save(function(err, resp) {
            if(err) return res.sendStatus(500, err);
                return res.json(resp);
        });
    },

    getGrain: function(req, res) {
        Grain.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.sendStatus(500);
                return res.json(resp);
        });
    },

    updateGrain: function(req, res) {
        Grain.findByIdAndUpdate(req.params._id, req.body, {new:true}, function(err, resp) {
            if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
        });
    }
};
