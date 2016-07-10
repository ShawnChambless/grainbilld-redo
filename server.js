var express     = require( 'express' ),
    session     = require( 'express-session' ),
    bodyParser  = require( 'body-parser' ),
    mongoose    = require( 'mongoose' ),
    passport    = require( './api/passport/config' ),
    compression = require( 'compression' ),
    userCtrl    = require( './api/controllers/userCtrl' ),
    recipeCtrl  = require( './api/controllers/recipeCtrl' ),
    grainCtrl   = require( './api/controllers/grainCtrl' ),
    hopsCtrl    = require( './api/controllers/hopsCtrl' ),
    yeastCtrl   = require( './api/controllers/yeastCtrl' ),
    ingredientCtrl = require('./api/controllers/ingredientCtrl'),
    moment      = require( 'moment' ),
    port        = process.argv[2] || 8080,
    app         = express();

mongoose
    .set('debug', true)
    .connect('mongodb://localhost:27017/grainbilld', function() {
        console.log('Mongo is also Listening');
    });

app
    .use(compression())
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json())
    .use(session({
        secret: 'JESUS-MakEs-really-good-beer',
        resave: 'false',
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .post('/auth/local/signup', passport.authenticate( 'local-signup' ), function(req, res){
        res.json(req.user);
    })
    .post('/auth/local/login', passport.authenticate( 'local-login' ), function(req, res){
        res.json(req.user);
    })
    .get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })
//User endpoints


    .post(   '/api/users',                       userCtrl.create )
    .get(    '/api/users/getUser',               userCtrl.getCurrentUser)
    .get(    '/api/user/recipes/:userId',        userCtrl.getRecipes)
    .put(    '/api/user/recipes/remove', recipeCtrl.removeRecipe)
    .put(    '/api/users/:user_id',              userCtrl.update )
    .post(   '/api/users/newRecipe',             recipeCtrl.newRecipe)
    .delete( '/api/users/:user_id',              userCtrl.remove )

//Recipe Endpoints

    .get(    '/api/recipes/community',    recipeCtrl.getCommunityRecipes)
    .get(    '/api/recipes',              recipeCtrl.getRecipeTotals)
    .get(    '/api/recipes/latest',       recipeCtrl.getLatestCommunityRecipes)

//Database endpoints

    .get(    '/api/database/ingredients/grain',      grainCtrl.getGrain)
    .post(   '/api/database/ingredients/grain',      grainCtrl.addGrain)
    .put(    '/api/database/ingredients/grain/:_id/',grainCtrl.updateGrain)
    .get(    '/api/database/ingredients/hops',       hopsCtrl.getHops)
    .post(   '/api/database/ingredients/hops',       hopsCtrl.addHops)
    .get(    '/api/database/ingredients/yeast',      yeastCtrl.getYeast)
    .post(   '/api/database/ingredients/yeast',      yeastCtrl.addYeast)
    .get(    '/api/database/ingredients/all',        ingredientCtrl.getAllIngredients)


    .listen(port, function() {
        console.log('Listening on:', port);
    });




