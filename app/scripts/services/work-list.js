'use strict';

/**
 * @ngdoc service
 * @name cvApp.workList
 * @description
 * # workList
 * Factory that reads from JSON and returns work experience list
 */
angular.module('cvApp')
    .factory('workList', function ($resource) {
        return $resource('resources/work-list.json');
    });
