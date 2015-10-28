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

		Restangular.all('authenticate').customGET().then(function(res) {
			localStorage['type'] = res.user.tipo;
			
		});

		////////////////

		function activate() {}
	}
})();
