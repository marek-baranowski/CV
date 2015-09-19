'use strict';

/**
 * @ngdoc overview
 * @name cvApp
 * @description
 * # cvApp
 *
 * Main module of the application.
 */
angular
    .module('cvApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/personal-details', {
                templateUrl: 'views/personal-details.html',
                controller: 'PersonalDetailsCtrl'
            })
            .when('/skills', {
                templateUrl: 'views/skills.html',
                controller: 'SkillsCtrl'
            })
            .when('/work-experience', {
                templateUrl: 'views/work-experience.html',
                controller: 'WorkExperienceCtrl'
            })
            .otherwise({
                redirectTo: '/personal-details'
            });

    })
    .run(function ($rootScope, $location) {
        $rootScope.location = $location;
    });
