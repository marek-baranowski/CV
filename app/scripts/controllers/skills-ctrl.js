'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:SkillsCtrl
 * @description
 * # SkillsCtrl
 * Controller dedicated for the 'Skills' view
 */
angular.module('cvApp')
    .controller('SkillsCtrl', function ($scope, skillgroups) {
        skillgroups.query(function (data) {
            $scope.skillGroups = data;
        });
    });
