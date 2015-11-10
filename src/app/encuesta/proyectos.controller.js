(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('ProyectosController', ProyectosController);

	/* @ngInject */
	function ProyectosController() {
		var vm = this;
		vm.title = 'ProyectosController';


		

		activate();


		function activate() {}
	}
})();
