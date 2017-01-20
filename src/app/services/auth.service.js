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
			isAdmin: isAdmin,
			getToken: getToken,
			getType: getType
		};
		return service;

		////////////////
		function isAdmin()
		{
			console.log(localStorage.getItem('userType'));
			return localStorage.getItem('userType')==='Admin';
		}

		function getType()
		{
			var deferred = $q.defer();
			Restangular.all('authenticate').customGET().then(function (res) {
				localStorage.setItem('userType',res.user.tipo);
				deferred.resolve(res);
			}).catch(function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		}


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

				getType().then(function(res){
					deferred.resolve(res);
				}).catch(function(err){
					deferred.reject(err);

				});

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
