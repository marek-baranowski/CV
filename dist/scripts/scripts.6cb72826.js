"use strict";

angular.module("cvApp", [ "ngResource", "ngRoute", "ngSanitize" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/personal-details", {
        templateUrl: "views/personal-details.html",
        controller: "PersonalDetailsCtrl"
    }).when("/skills", {
        templateUrl: "views/skills.html",
        controller: "SkillsCtrl"
    }).when("/work-experience", {
        templateUrl: "views/work-experience.html",
        controller: "WorkExperienceCtrl"
    }).otherwise({
        redirectTo: "/personal-details"
    });
} ]).run([ "$rootScope", "$location", function($rootScope, $location) {
    $rootScope.location = $location;
} ]), angular.module("cvApp").controller("PersonalDetailsCtrl", [ "$scope", "personalDetails", function($scope, personalDetails) {
    personalDetails.query(function(data) {
        $scope.details = data;
    });
} ]), angular.module("cvApp").controller("SkillsCtrl", [ "$scope", "skillgroups", function($scope, skillgroups) {
    skillgroups.query(function(data) {
        $scope.skillGroups = data;
    });
} ]), angular.module("cvApp").directive("skillgroup", function() {
    return {
        templateUrl: "../views/skillgroup.html",
        restrict: "E",
        scope: {
            skillGroup: "=group"
        }
    };
}), angular.module("cvApp").controller("WorkExperienceCtrl", [ "$scope", "workList", function($scope, workList) {
    workList.query(function(data) {
        $scope.workList = data;
    });
} ]), angular.module("cvApp").factory("skillgroups", [ "$resource", function($resource) {
    return $resource("resources/skillgroups.json");
} ]), angular.module("cvApp").factory("personalDetails", [ "$resource", function($resource) {
    return $resource("resources/personal-details.json");
} ]), angular.module("cvApp").factory("workList", [ "$resource", function($resource) {
    return $resource("resources/work-list.json");
} ]), angular.module("cvApp").controller("MainCtrl", [ "$scope", function($scope) {
    $scope.navigationLinks = [ {
        title: "Personal details",
        link: "/personal-details"
    }, {
        title: "Skills",
        link: "/skills"
    }, {
        title: "Work experience",
        link: "/work-experience"
    } ];
} ]);