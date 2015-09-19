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
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
