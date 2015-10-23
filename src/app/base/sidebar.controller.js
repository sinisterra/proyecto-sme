(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SidebarController', SidebarController);

	/* @ngInject */
	function SidebarController($state, User, $mdSidenav) {
		var vm = this;

		vm.$state = $state;

		vm.user = User;

		vm.close = close;

		function close() {
			$mdSidenav('left').toggle();
		}

	}
})();
