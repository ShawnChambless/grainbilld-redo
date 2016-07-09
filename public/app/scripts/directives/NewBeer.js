(function () {
    "use strict";

    angular.module('GrainBilld')
        .directive('editRecipe', function(RecipeService) {
            return {
                scope: {
                    ingredient: '=',
                    ingredientType: '='
                },
                template: '<p>{{ingredient.name}}</p>',
                link: function(scope, elem, attrs) {
                    elem.on('click', function() {
                        RecipeService.addIngredient(scope.ingredientType, scope.ingredient);
                        scope.$apply(scope.grainInRecipe, scope.hopsInRecipe, scope.yeastInRecipe, scope.grainValues, scope.hopsValues, scope.yeastValues);
                    });
                }
            };
        });

}());

