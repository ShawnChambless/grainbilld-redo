(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.directive('collapse', collapse);

	function collapse() {
		return {
			restrict: 'A'
			, link: function(scope, elem, attrs) {
				$(document).ready(function(){
					$('.collapsible').collapsible();
				});
			}
		}
	}

}());