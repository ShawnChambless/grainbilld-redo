var express     = require('express'),
    AuthRouter  = express.Router(),
    passport    = require('passport');



AuthRouter
    .post('/auth/local/signup', passport.authenticate( 'local-signup' ), function(req, res){
        res.json(req.user);
    })
    .post('/auth/local/login', passport.authenticate( 'local-login' ), function(req, res){
        res.json(req.user);
    })
    .get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

module.exports = AuthRouter;