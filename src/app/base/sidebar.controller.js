(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SidebarController', SidebarController);

	/* @ngInject */
	function SidebarController($state, User) {
		var vm = this;
		
		vm.$state = $state;

		vm.user = User;
	}
})();
