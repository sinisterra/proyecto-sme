(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('BaseController', BaseController);

	/* @ngInject */
	function BaseController($mdSidenav, $state, User) {
		var vm = this;
		vm.title = 'BaseController';

		vm.$state = $state;

		vm.toggle = toggle;
		activate();


		////////////////

		function activate() {
			
		}

		function toggle() {
			$mdSidenav('left').toggle();
		}
	}
})();
