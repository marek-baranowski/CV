'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:PersonalDetailsCtrl
 * @description
 * # PersonalDetailsCtrl
 * Controller dedicated for the 'Personal details' view
 */
angular.module('cvApp')
    .controller('PersonalDetailsCtrl', function ($scope, personalDetails) {
        personalDetails.query(function (data) {
            $scope.details = data;
        });
    });
