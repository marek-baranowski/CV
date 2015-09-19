'use strict';

/**
 * @ngdoc function
 * @name cvApp.controller:SkillsCtrl
 * @description
 * # SkillsCtrl
 * Controller of the cvApp
 */
angular.module('cvApp')
    .controller('SkillsCtrl', function ($scope) {
        $scope.skillGroups = [
            {
                "title": "General skills",
                "skills": ["Javascript", "Java", "HTML", "CSS", "Knowledge of databases (SQL, NoSQL)"]
            },
            {
                "title": "Frameworks and libraries",
                "skills": ["AngularJS", "Backbone.js + Thorax.js", "jQuery", "Dojo", "Sass", "Twitter Bootstrap",
                    "Play framework", "SpringMVC", "IBM WebSphere Commerce + Struts", "Hibernate"]
            },
            {
                "title": "Tools",
                "skills": ["Grunt", "Bower", "Yeoman", "Git, Subversion", "Jenkins, Maven"]
            }
        ];
    });
