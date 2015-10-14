(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('HomeController', HomeController);

	/* @ngInject */
	function HomeController(User, $state) {
		var vm = this;
		
		vm.submit = submit;

		function submit(isValid){
			if(isValid){
				User.username = vm.model.username;
				User.password = vm.model.password;
				User.isLoggedIn = true;
				localStorage.isLoggedIn = true;
				$state.go('dashboard');
			}
		}
	}
})();
