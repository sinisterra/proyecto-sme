(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('DashboardController', DashboardController);

	function DashboardController(User) {
		var vm = this;
		vm.title = 'DashboardController';
		vm.user = User;

		activate();

		////////////////

		function activate() {}
	}
})();
