'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:PersonalDetailsCtrl
 * @description
 * # PersonalDetailsCtrl
 * Controller of the cvApp
 */
angular.module('cvApp')
    .controller('PersonalDetailsCtrl', function ($scope) {
        $scope.details = [
            {
                "name": "Date of birth",
                "value": "28.08.1991"
            },
            {
                "name": "Location",
                "value": "Wrocław, Poland"
            },
            {
                "name": "Telephone",
                "value": "+48 695 465 608"
            },
            {
                "name": "E-mail",
                "value": "baranowski.mt@gmail.com"
            }
        ]
    });
