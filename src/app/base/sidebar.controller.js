(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SidebarController', SidebarController);

	/* @ngInject */
	function SidebarController($state, User,ssSideNav,$mdSidenav, Restangular, Auth) {
		var vm = this;

		vm.menu = ssSideNav;


		vm.$state = $state;


		vm.user = User;

		vm.close = close;

		function close() {
			$mdSidenav('left').toggle();
		}

		function activate() {


			if (!localStorage.getItem('type')) {
				Restangular.all('authenticate').customGET().then(function(res) {
					localStorage['type'] = res.user.tipo;
					vm.isUser = localStorage['type'] === 'User' ? true : false;
				});
			}

		}

		activate();

	}
})();
