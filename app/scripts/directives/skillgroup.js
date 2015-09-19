'use strict';

/**
 * @ngdoc directive
 * @name cvApp.directive:skillgroup
 * @description
 * # skillgroup
 */
angular.module('cvApp')
    .directive('skillgroup', function () {
        return {
            templateUrl: '../views/skillgroup.html',
            restrict: 'E',
            scope: {
                skillGroup: "=group"
            },
            link: function postLink(scope, element, attrs) {
            }
        };
    });
