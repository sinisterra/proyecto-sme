(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SidebarController', SidebarController);

	/* @ngInject */
	function SidebarController($state, User, $mdSidenav, Restangular, Auth) {
		var vm = this;

		vm.$state = $state;

		vm.user = User;

		vm.close = close;

		function close() {
			$mdSidenav('left').toggle();
		}

		function activate() {
			vm.auth = Auth;
			vm.isUser = vm.auth.type === 'User' ? true : false;

		}

		activate();

	}
})();
