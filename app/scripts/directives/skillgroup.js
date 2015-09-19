'use strict';

/**
 * @ngdoc directive
 * @name cvApp.directive:skillgroup
 * @description
 * # skillgroup
 * Directive that shows group of skills
 */
angular.module('cvApp')
    .directive('skillgroup', function () {
        return {
            templateUrl: '../views/skillgroup.html',
            restrict: 'E',
            scope: {
                skillGroup: '=group'
            }
        };
    });
