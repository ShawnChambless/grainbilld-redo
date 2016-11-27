(function() {
	'use strict';

	angular
			.module('GrainBilld')
			.directive('formUpdate', formUpdate);

	function formUpdate() {

		return {
			restrict: 'A'
			, link: function(scope, elem, attrs) {
				$(document).ready(function() {
					Materialize.updateTextFields();
				});
			}
		}

	}

}());