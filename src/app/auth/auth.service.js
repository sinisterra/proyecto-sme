(function() {
	'use strict';

	angular
		.module('appSme')
		.factory('Auth', Auth);

	/* @ngInject */
	function Auth($q, Restangular, $state, localStorage) {
		var service = {
			login: login,
			logout: logout,
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

		function logout(){
			localStorage.clear();
		}
	}
})();
