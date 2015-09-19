'use strict';

/**
 * @ngdoc service
 * @name cvApp.personalDetails
 * @description
 * # personalDetails
 * Factory that reads from JSON and returns personal details
 */
angular.module('cvApp')
    .factory('personalDetails', function ($resource) {
        return $resource('resources/personal-details.json');
    });
