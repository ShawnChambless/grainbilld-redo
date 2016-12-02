(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.controller('profileController', profileController);

	profileController.$inject = [ 'UserService', 'user' ];

	function profileController(UserService, user) {
		var cnt = this;

		function init() {
			cnt.user = user;
			cnt.favorites = user.favorites;
			cnt.removeFavorite = removeFavorite;
		}

		init();


		function removeFavorite(id) {
			UserService.removeFavorite(id)
					.then(function(resp) {
						console.log(resp);
					});
		}

	}

}());