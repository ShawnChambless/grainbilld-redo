var express     = require('express'),
    UserRouter  = express.Router(),
    UserCtrl    = require('./../controllers/UserCtrl'),
    RecipeCtrl  = require('./../controllers/RecipeCtrl');


UserRouter
    .post(   '/api/users',                       UserCtrl.create )
    .get(    '/api/users/getUser',               UserCtrl.getCurrentUser)
    .get(    '/api/user/recipes/:userId',        UserCtrl.getRecipes)
    .put(    '/api/user/recipes/remove', RecipeCtrl.removeRecipe)
    .put(    '/api/users/:user_id',              UserCtrl.update )
    .post(   '/api/users/newRecipe',             RecipeCtrl.newRecipe)
    .delete( '/api/users/:user_id',              UserCtrl.remove );

module.exports = UserRouter;
