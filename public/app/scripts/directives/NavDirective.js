angular.module('GrainBilld')
.directive('navDir', function($mdToast) {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/NavTemplate.html',
		link: function(scope, elem, attrs) {

			

		},
		controller: 'NavController'
	};
});