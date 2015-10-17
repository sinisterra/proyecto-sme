(function() {
	'use strict';

	angular
		.module('appSme')
		.service('AuthInterceptor', AuthInterceptor);

	/* @ngInject */
	function AuthInterceptor($injector, $q) {
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

		function response(res){
			return res;
		}

		function responseError(response){
			var $state = $injector.get('$state');
			if(response.status === 403){
				$state.go('home');
			}

			return $q.reject(response);
		}

		return service;
	}
})();