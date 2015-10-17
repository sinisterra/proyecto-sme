(function() {
	'use strict';

	angular
		.module('appSme')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, User, $state, Auth) {

		$log.debug('runBlock end');

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

			if(toState.data.requireLogin === true && !Auth.isLoggedIn()){
				$state.go('home');
			}
		});

	}

})();
