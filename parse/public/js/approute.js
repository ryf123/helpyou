// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'mainController'
            })

            .when('/schoolform', {
                templateUrl : 'schoolform.html',
                controller  : 'aboutController'
            })
            .when('/districtform', {
                templateUrl : 'districtform.html',
                controller  : 'aboutController'
            })
            .when('/districtform', {
                templateUrl : 'districtform.html',
                controller  : 'contactController'
            })
            .when('/studentform', {
                templateUrl : 'studentform.html',
                controller  : 'contactController'
            })
            .when('/registrationinput', {
                templateUrl : 'registrationinput.html',
                controller  : 'contactController'
            })
            .when('/schooltable', {
                templateUrl : 'schooltable.html',
                controller  : 'contactController'
            })
            .when('/studentsignintable', {
                templateUrl : 'studentsignintable.html',
                controller  : 'contactController'
            })
            .when('/studentpickuptable', {
                templateUrl : 'studentpickuptable.html',
                controller  : 'contactController'
            })
            .when('/hotlinenotification', {
                templateUrl : 'hotlinenotification.html',
                controller  : 'contactController'
            })
            .when('/studenttable', {
                templateUrl : 'studenttable.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });