// (function() {
// 	'use strict';

// 	angular
// 		.module('appSme')
// 		.service('$auth', auth);

// 	// auth.$inject = ['$window', '$location', 'jwtHelper', '$q', 'Restangular'];

// 	function auth($window, $location, $q, Restangular, $log) {
// 		// jwtHelper,
// 		var deferred = $q.defer();
// 		var $user = Restangular.all('user');

// 		var authenticate = {
// 			getToken: function() {
// 				return $window.localStorage.getItem('token');
// 			},
// 			setToken: function(token, iduser, user) {
// 				$window.localStorage.setItem('token', token);
// 				$window.localStorage.setItem('iduser', iduser);

// 				// eliminar cosas que no se deberían guardar
// 				var userData = {
// 					'id': user.auth.id
// 				};
// 				$window.localStorage.setItem('user', angular.toJson(userData));
// 			},
// 			deleteToken: function() {
// 				$window.localStorage.removeItem('token');
// 				$window.localStorage.removeItem('iduser');
// 				$window.localStorage.removeItem('user');
// 			},
// 			getuser: function() {
// 				return $window.localStorage.getItem('iduser');
// 			},
// 			getUserDef: function() {
// 				return angular.fromJson($window.localStorage.getItem('user'));
// 			},
// 			setUserDef: function(user) {
// 				$window.localStorage.setItem('user', angular.toJson(user));
// 			},
// 			isLoggedIn: function() {
// 				return authenticate.getToken();
// 			},
// 			logout: function() {
// 				authenticate.deleteToken();
// 			},
// 			login: function(email, password) {
// 				deferred = $q.defer();

// 				Restangular.all('auths')
// 					.customPOST({
// 						email: email,
// 						password: password
// 					}, "login")
// 					.then(function(data) {

// 						if (data.token) {
// 							$log.info('Token accepted');
// 							authenticate.setToken(data.token, data.user.id, data.user);
// 						} else {
// 							$log.info('Token not present');
// 						}
// 						deferred.resolve(data);
// 					})
// 					.catch(function(err) {
// 						deferred.reject(err);
// 					});
// 				return deferred.promise;
// 			}
// 		};
// 		return authenticate;

// 	}
// })();


(function() {
	'use strict';

	angular
		.module('appSme')
		.factory('Auth', Auth);

	/* @ngInject */
	function Auth($q, Restangular, $state) {
		var service = {
			login: login,
			isLoggedIn: isLoggedIn,
			getToken: getToken
		};
		return service;

		////////////////

		function login(username, password) {
			var deferred = $q.defer();

			Restangular.all('authenticate').customPOST({
				username: username,
				password: password
			})
			.then(function(res){
				if(res.token){
					localStorage.setItem('token', res.token);
				}
					
				deferred.resolve(res);
			})
			.catch(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		function isLoggedIn(){
			return localStorage.getItem('token') || false;
		}

		function getToken(){
			return localStorage.getItem('token');
		}
	}
})();
