'use strict';

/* Controllers */

var mainControllers = angular.module('mainControllers', []);
mainControllers.controller('mainCtrl', ['$scope','Sources','User','$location',
		function($scope, Sources,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.user.id = User.getCurrentId();
			console.log(User.getCurrent());
		}]);
mainControllers.controller('loginCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.submit = function(){
				console.log($scope.email);
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				console.log(credentials);
				$scope.user = User.login(credentials, function(){
					//console.log($scope.user.id);
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
mainControllers.controller('logoutCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			User.logout(function(){
				console.log("OK");
				$location.path("/");
			},function(res){
				console.log(res);
			});

		}
]);
mainControllers.controller('signupCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.user ={};
			$scope.user.isAuthenticated = User.isAuthenticated();
			$scope.submit = function(){
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				$scope.user = User.create(credentials, function(){
					console.log($scope.user.id);
					console.log("OK");
					$location.path("/login");
				},function(res){
					console.log(res);
				});

			}
		}]);
mainControllers.controller('deleteCtrl', ['$scope','User','$location',
		function($scope,User,$location) {
			$scope.submit = function(){
				var credentials = {
					email:$scope.email,
					password:$scope.password
				};
				User.login(credentials, function(){
					console.log("User logged in");
					User.deleteById({id:User.getCurrentId()}, function(){
						console.log("User deleted");
					},function(res){
						console.log(res);
					});
					$location.path("/");
				},function(res){
					console.log(res);
				});

			}
		}]);
