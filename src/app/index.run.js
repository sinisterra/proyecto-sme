(function() {
	'use strict';

	angular
		.module('appSme')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, User, $state, Auth, Restangular) {

		$log.debug('runBlock end');

		

		$rootScope.$on('$stateChangeSuccess', function(event, toState) {

			if (toState.data.requireLogin === true && !Auth.isLoggedIn()) {
				$state.go('home');
			}
		});

	}

})();
