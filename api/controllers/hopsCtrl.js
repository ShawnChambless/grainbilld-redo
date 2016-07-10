var mongoose = require('mongoose'),
    Hops = mongoose.model('Hops', require('../models/hopsModel'));

module.exports = {
    addHops: function(req, res) {
        var newHops = new Hops(req.body);
        newHops.save(function(err, resp) {
            if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
        });
    },

    getHops: function(req, res) {
        Hops.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
        });
    }
};
