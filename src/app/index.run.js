(function() {
	'use strict';

	angular
		.module('appSme')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, User, $state, Auth, Restangular) {

		$log.debug('runBlock end');

		if (Auth.type === undefined) {
			Restangular.all('authenticate').customGET().then(function(res) {
				Auth.type = res.user.tipo;
				$log.log('User type', Auth.type);
			});
		}

		$rootScope.$on('$stateChangeSuccess', function(event, toState) {

			if (toState.data.requireLogin === true && !Auth.isLoggedIn()) {
				$state.go('home');
			}
		});

	}

})();
