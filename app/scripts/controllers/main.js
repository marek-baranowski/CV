'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main controller of the app
 */
angular.module('cvApp')
    .controller('MainCtrl', function ($scope) {
        $scope.navigationLinks = [
            {
                'title': 'Personal details',
                'link': '/personal-details'
            },
            {
                'title': 'Skills',
                'link': '/skills'
            },
            {
                'title': 'Work experience',
                'link': '/work-experience'
            }
        ];
    });
