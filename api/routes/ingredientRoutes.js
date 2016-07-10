var express             = require('express'),
    IngredientRouter    = express.Router(),
    GrainCtrl           = require( './../controllers/GrainCtrl' ),
    HopsCtrl            = require( './../controllers/HopsCtrl' ),
    YeastCtrl           = require( './../controllers/YeastCtrl' ),
    IngredientCtrl      = require( './../controllers/IngredientCtrl' );

IngredientRouter
    .get ( '/grain',        GrainCtrl.getGrain)
    .post( '/grain',        GrainCtrl.addGrain)
    .put ( '/grain/:_id/',  GrainCtrl.updateGrain)
    .get ( '/hops',         HopsCtrl.getHops)
    .post( '/hops',         HopsCtrl.addHops)
    .get ( '/yeast',        YeastCtrl.getYeast)
    .post( '/yeast',        YeastCtrl.addYeast)
    .get ( '/all',          IngredientCtrl.getAllIngredients);

module.exports = IngredientRouter;