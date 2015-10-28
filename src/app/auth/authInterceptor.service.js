(function() {
	'use strict';

	angular
		.module('appSme')
		.service('AuthInterceptor', AuthInterceptor);

	/* @ngInject */
	function AuthInterceptor($injector, $q, $log) {
		var service = {
			request: request,
			response: response,
			responseError: responseError
		};

		function request(config) {

			var Auth = $injector.get('Auth');
			var token = Auth.getToken();

			if (token) {
				config.headers['Authorization'] = 'Bearer ' + token;
				// config.headers['access_token'] = token;
			}

			return config;
		}

		function response(res) {
		
			return res;
		}

		function responseError(response) {
			var $state = $injector.get('$state');
			if (response.status === 401) {
				toastr.info('Tu sesión se cerró automáticamente por inactividad. Inicia sesión de nuevo. ', 'Sesión cerrada por inactividad');
				$injector.get('Auth').logout();
				$state.go('home');
			}

			return $q.reject(response);
		}

		return service;
	}
})();
