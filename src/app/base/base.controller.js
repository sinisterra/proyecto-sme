(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('BaseController', BaseController);

	/* @ngInject */
	function BaseController($mdSidenav, $state) {
		var vm = this;
		vm.title = 'BaseController';

		vm.$state = $state;

		vm.toggle = toggle;
		activate();

		vm.stateNames = {
			'dashboard': 'Menú Principal',
			'personal': 'Datos Personales',
		};

		////////////////

		function activate() {
			console.log("cargando!")
		}

		function toggle() {
			$mdSidenav('left').toggle();
		}
	}
})();
