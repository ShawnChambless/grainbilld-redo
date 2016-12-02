angular
		.module('GrainBilld')
		.factory('UserService', userService);

function userService($http) {

	return {
		getUser: getUser
		, removeFavorite: removeFavorite
	};

	function getUser() {
		return $http.get('/api/users/getUser')
				.then(function(resp) {
					return resp.data;
				});
	}

	function removeFavorite(id) {
		return $http.delete('/api/users/favorites/' + id)
				.then(function(resp) {
					return resp.data;
				});
	}

}