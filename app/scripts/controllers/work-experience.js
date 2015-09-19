'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:WorkExperienceCtrl
 * @description
 * # WorkExperienceCtrl
 * Controller dedicated for the 'Work experience' view
 */
angular.module('cvApp')
    .controller('WorkExperienceCtrl', function ($scope, workList) {
        workList.query(function (data) {
            $scope.workList = data;
        });
    });
