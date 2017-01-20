(function() {
	'use strict';

	angular
		.module('appSme')
		.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, $state, Auth,ssSideNav) {

		$log.debug('runBlock end');

		

		$rootScope.$on('$stateChangeSuccess', function(event, toState) {
			if(Auth.isAdmin())
			{
				ssSideNav.setVisible('admin_menu',true);
			}
			else {
				ssSideNav.setVisible('admin_menu',false);
			}


			if (toState.data.requireLogin === true && !Auth.isLoggedIn()) {
				$state.go('home');
			}

			if (toState.data.requireAdmin === true && !Auth.isAdmin()){
				$state.go('home');
			}

		});

	}

})();
