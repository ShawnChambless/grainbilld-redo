(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.factory('HomeService', homeService);

	homeService.$inject = [ '$http' ];

	function homeService($http) {
		return {};
	}

}());

