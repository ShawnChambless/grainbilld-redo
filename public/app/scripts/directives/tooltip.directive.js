(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.directive('tooltip', tooltip);

	function tooltip() {
		return {
			restrict: 'A'
			, link: function(scope, elem, attrs) {
				$(document).ready(function() {
					$('.tooltipped').tooltip({
						delay: 50
						, position: 'bottom'
						, tooltip: attrs.info
					});
				});
			}
		}
	}

}());