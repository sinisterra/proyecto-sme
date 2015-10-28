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

		vm.stateNames = {
			'dashboard': 'Menú Principal',
			'infoPersonal': 'Datos Personales',
			'stats': 'Estadísticas'
		};

		////////////////

		function activate() {
			
		}

		function toggle() {
			$mdSidenav('left').toggle();
		}
	}
})();
