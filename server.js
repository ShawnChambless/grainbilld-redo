(function() {
	'use strict';

	const express          = require('express')
			, session          = require('express-session')
			, bodyParser       = require('body-parser')
			, mongoose         = require('mongoose')
			, passport         = require('./api/passport/config')
			, compression      = require('compression')
			, userCtrl         = require('./api/controllers/userCtrl')
			, IngredientRoutes = require('./api/routes/ingredientRoutes')
			, RecipeRoutes     = require('./api/routes/recipeRoutes')
			, UserRoutes       = require('./api/routes/userRoutes')
			, AuthRoutes       = require('./api/routes/authRoutes')
			, port             = process.argv[ 2 ] || 8080
			, app              = express();

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

			.use('/api/ingredients/', IngredientRoutes)
			.use('/api/recipes/', RecipeRoutes)
			.use('/api/user/', UserRoutes)
			.use('/api/auth/', AuthRoutes)


			.listen(port, function() {
				console.log('Listening on:', port);
			});


}());