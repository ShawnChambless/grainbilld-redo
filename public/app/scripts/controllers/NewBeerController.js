(function () {
    "use strict";

angular.module('GrainBilld')
    .controller('NewBeerController', function($scope, RecipeService, getIngredients, $rootScope, $state, $timeout) {

        console.log(getIngredients)

        $scope.grainInDb        = getIngredients.grain;
        $scope.hopsInDb         = getIngredients.hops;
        $scope.yeastInDb        = getIngredients.yeast;
        $scope.grainInRecipe    = RecipeService.grainInRecipe;
        $scope.hopsInRecipe     = RecipeService.hopsInRecipe;
        $scope.yeastInRecipe    = RecipeService.yeastInRecipe;
        $scope.grainValues      = RecipeService.grainValues;
        $scope.hopsValues       = RecipeService.hopsValues;
        $scope.yeastValues      = RecipeService.yeastValues;
        $scope.grains           = 'grain';
        $scope.hopss            = 'hops';
        $scope.yeasts           = 'yeast';
        $scope.recipe           = {};
        $scope.recipe.isPrivate = true;

        $scope.showGrainData = function() {
            $scope.showGrain    = true;
            $scope.showHops     = false;
            $scope.showYeast    = false;
        };

        $scope.showHopsData = function() {
            $scope.showGrain  = false;
            $scope.showHops   = true;
            $scope.showYeast  = false;
        };

        $scope.showYeastData = function() {
            $scope.showGrain    = false;
            $scope.showHops     = false;
            $scope.showYeast    = true;
        };

        $scope.removeGrain = function(index) {
            RecipeService.grainInRecipe.splice(index, 1);
        };

        $scope.removeHops = function(index) {
            RecipeService.hopsInRecipe.splice(index, 1);
        };

        $scope.removeYeast = function(index) {
            RecipeService.yeastInRecipe.splice(index, 1);
        };

        $scope.saveRecipeToUser = function(recipe) {
            var user = $scope.currentUser.id;
            RecipeService.saveRecipeToUser(recipe, user).then(function(resp) {
                console.log(resp);
                $scope.response = resp;
                var flashSuccess = document.getElementById('flashSuccess');
                flashSuccess.classList.toggle('active');
                $timeout(function() {
                    flashSuccess.classList.toggle('active');
                }, 3000);
                $scope.showGrain = $scope.showHops = $scope.showYeast = false;
                $scope.recipe = {}; $scope.grainInRecipe = RecipeService.grainInRecipe; $scope.hopsInRecipe = RecipeService.hopsInRecipe; $scope.yeastInRecipe = RecipeService.yeastInRecipe; $scope.grainValues = RecipeService.grainValues; $scope.hopsValues = RecipeService.hopsValues; $scope.yeastValues = RecipeService.yeastValues; $scope.recipe.isPrivate = true;
            }, function(err) {
                var flashError = document.getElementById('flashError');
                flashError.classList.toggle('active');
                $timeout(function() {
                    flashError.classList.toggle('active');
                }, 3000);
            });
        };

    });

}());


