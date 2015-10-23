(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('HomeController', HomeController);

	/* @ngInject */
	function HomeController(User, $state, Restangular, Auth, toastr) {
		var vm = this;

		vm.submit = submit;
		vm.signupSubmit = signupSubmit;


		function activate(){
			if(Auth.isLoggedIn()){
				$state.go('dashboard');
			}
		}

		activate();
		function submit(isValid) {
			if (isValid) {
				vm.attemptingLogin = true;
				Auth.login(vm.model.username, vm.model.password)
					.then(function(res) {
						$state.go('dashboard');
						vm.attemptingLogin = false;
					})
					.catch(function(err) {
						vm.attemptingLogin = false;
						if (err.status === 401) {

							toastr.error('Usuario y/o contraseña equivocados. Prueba de nuevo.', 'Error');
						}
					});
			}
		}

		function signupSubmit(isValid) {
			if (isValid) {

				Restangular.all('register').customPOST({
						username: vm.signupModel.username,
						password: vm.signupModel.password,
						id: vm.signupModel.id,
						// tipo: 'User',
					})
					.then(function(res) {
						//se ha registrado
						Auth.login(vm.signupModel.username, vm.signupModel.password)
							.then(function(res) {
								$state.go('dashboard');
							});

					})
					.catch(function(err) {
						toastr.error('Hubo un error al intentar iniciar sesión ('+err.status+')');
					});
			}
		}
	}
})();
