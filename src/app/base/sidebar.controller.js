(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SidebarController', SidebarController);

	/* @ngInject */
	function SidebarController($state) {
		var vm = this;
		
		vm.$state = $state;

		vm.user = 'user';
	}
})();
