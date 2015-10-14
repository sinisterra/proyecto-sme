(function() {
	'use strict';

	angular
		.module('appSme')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, User, $state) {

		$log.debug('runBlock end');

		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

			if(toState.data.requireLogin === true && !User.isLoggedIn){
				$state.go('home');
			}
		});

	}

})();
