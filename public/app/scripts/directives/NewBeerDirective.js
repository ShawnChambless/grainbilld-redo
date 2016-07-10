angular.module('GrainBilld')
.directive('newBeerDir', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/templates/NewBeerTemplate.html',
		link: function(scope, elem, attrs) {
			 
		}
	};
});