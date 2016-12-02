const mongoose = require('mongoose'),
			User     = mongoose.model('User', require('../models/userModel'));

module.exports = {

	createUser: createUser
	, retrieveOne: retrieveOne
	, getCurrentUser: getCurrentUser
	, getRecipes: getRecipes
	, getFavorites: getFavorites
	, updateUser: updateUser
	, updateFavorites: updateFavorites
	, removeFavorite: removeFavorite
	, removeUser: removeUser
};

function createUser(req, res) {
	let newUser       = new User();
	newUser.firstName = req.body.firstName;
	newUser.lastName  = req.body.lastName;
	newUser.email     = req.body.email;
	newUser.password  = createHash(req.body.password);

	newUser.save(function(err, createdUser) {
		responseHandler(res, err, createdUser);
	});
}

function retrieveOne(req, res) {
	let query = {};
	if (req.user || req.params.user_id) query = { "_id": req.params.user_id };
	else query = { "email": req.body.email };
	User.findOne(query)
			.populate('favorites recipes')
			.exec().then(function(user, err) {
		if (err) {
			console.log(err);
			return res.status(500).json(err);
		}
		else if (user) {
			if (query._id) return res.status(200).json(user);
			if (checkHash(req.body.password, user.password)) {
				return res.status(200).json(user);
			}
			if (!checkHash(req.body.password, user.password)) {
				return res.status(401).send('Invalid password');
			}
		}
	});
}

function getCurrentUser(req, res) {
	if (req.user) return res.status(200).json(req.user);
	else return res.json('');
}

//TODO add route for getFavorites
function getFavorites(req, res) {
	User
			.findById(req.params.user_id)
			.populate('favorites')
			.exec((resp, err) => {
				responseHandler(res, err, resp)
			});
}

function updateUser(req, res) {
	User.findByIdAndUpdate(req.params.user_id, req.body, { new: true }, function(err, updatedUser) {
		responseHandler(res, err, updatedUser);
	});
}

function updateFavorites(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		user.favorites.push(new mongoose.Types.ObjectId(req.params.post_id));
		user.save(function(error, updatedUser) {
			responseHandler(res, error, updatedUser)
		});
	});
}

function removeFavorite(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) return res.status(500).json(err);
		user.favorites.removeUser({ '_id': req.params.post_id }, function(err, resp) {
			responseHandler(res, err, resp);
		});
	});
}

function removeUser(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err) {
		responseHandler(res, err, 'User ' + req.params.user_id + ' has been deleted');
	});
}

function getRecipes(req, res) {
	User.findById(req.params.userId)
			.populate('recipes')
			.exec(function(err, recipes) {
				responseHandler(res, err, recipes);
			});

}

function responseHandler(res, err, resp) {
	if (err) return res.status(500).json(err);
	return res.status(200).json(resp);
}
