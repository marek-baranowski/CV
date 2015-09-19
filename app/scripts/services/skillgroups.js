'use strict';

/**
 * @ngdoc service
 * @name cvApp.skillgroups
 * @description
 * # skillgroups
 * Factory that reads from JSON and returns groups of skills
 */
angular.module('cvApp')
    .factory('skillgroups', function ($resource) {
        return $resource('resources/skillgroups.json');
    });