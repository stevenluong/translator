'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
        'ngRoute',
        //'mainAnimations',
        'mainControllers',
        'mainFilters',
        'lbServices',
        //'satellizer',
        'mainServices'
])
/*
.config(function($authProvider) {
});

*/
.config(function(LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    //      LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    //
    //         // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
});
mainApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'mainCtrl'
                }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            }).
             when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'signupCtrl'
            }).
             when('/logout', {
                templateUrl: 'partials/logout.html',
                controller: 'logoutCtrl'
            }).
             when('/delete', {
                templateUrl: 'partials/delete.html',
                controller: 'deleteCtrl'
            }).



            otherwise({
                redirectTo: '/'
            });
        }]);
