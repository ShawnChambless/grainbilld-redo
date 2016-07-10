var mongoose = require('mongoose'),
    Yeast = mongoose.model('Yeast', require('../models/yeastModel'));

module.exports = {
    addYeast: function(req, res) {
        var newYeast = new Yeast(req.body);
        newYeast.save(function(err, resp) {
            if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
        });
    },

    getYeast: function(req, res) {
        Yeast.find(req.query)
        .exec(function(err, resp) {
            if(err) return res.status(500).json(err);
                return res.status(200).json(resp);
        });
    }
};
