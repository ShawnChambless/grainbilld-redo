(function() {
	'use strict';

	angular.module('GrainBilld')
	.directive('homeDir', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/HomeTemplate.html',
			link: function(scope, elem, attrs) {



			}
		};
	});

}());
