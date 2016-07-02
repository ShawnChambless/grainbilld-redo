angular.module('GrainBilld', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/Home');

  $stateProvider

    .state('home', {
      url: '/Home',
      controller: 'HomeController',
      templateUrl: 'app/templates/HomeTemplate.html'
    });

}]);
