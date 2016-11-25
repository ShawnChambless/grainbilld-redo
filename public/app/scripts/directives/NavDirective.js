angular.module('GrainBilld')
		.directive('navDir', function() {
			return {
				restrict: 'E',
				templateUrl: 'app/templates/nav.template.html',
				link: function(scope, elem, attrs) {
					var subMenu = $("#js-navigation-more").find(".submenu .submenu");

					$(window).resize(function() {
						var more = document.getElementById("js-navigation-more");
						if ($(more).length > 0) {
							var windowWidth                 = $(window).width();
							var moreLeftSideToPageLeftSide  = $(more).offset().left;
							var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

							if (moreLeftSideToPageRightSide < 330) {
								subMenu.removeClass("fly-out-right");
								subMenu.addClass("fly-out-left");
							}

							if (moreLeftSideToPageRightSide > 330) {
								subMenu.removeClass("fly-out-left");
								subMenu.addClass("fly-out-right");
							}
						}
					});

					$(document).ready(function() {
						var menuToggle = $("#js-mobile-menu").unbind();
						$("#js-navigation-menu").removeClass("show");

						menuToggle.on("click", function(e) {
							e.preventDefault();
							$("#js-navigation-menu").slideToggle(function() {
								if ($("#js-navigation-menu").is(":hidden")) {
									$("#js-navigation-menu").removeAttr("style");
								}
							});
						});
					});


				},
				controller: 'NavController'
			};
		});