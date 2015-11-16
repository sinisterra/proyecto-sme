(function() {
	'use strict';

	angular
		.module('appSme')
		.factory('User', User);

	/* @ngInject */
	function User() {
		return {
			isLoggedIn : localStorage.isLoggedIn || false
		};

	}


})();
