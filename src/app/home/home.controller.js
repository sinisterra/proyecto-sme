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


		function submit(isValid) {
			if (isValid) {
				vm.attemptingLogin = true;
				Auth.login(vm.model.username, vm.model.password)
					.then(function(res) {
						$state.go('dashboard');
						vm.attemptingLogin = false;
					})
					.catch(function(err){
						vm.attemptingLogin = false;
						if(err.status === 401){
							if(err.error === "invalid_credentials"){
								toastr.error('Los datos para iniciar sesión son incorrectos', 'Error');
							}
						}
					});

				// User.username = vm.model.username;
				// User.password = vm.model.password;
				// User.isLoggedIn = true;
				// localStorage.isLoggedIn = true;
				// $state.go('dashboard');
			}
		}

		// function attemptLogin(res){
		// 	$state.go('dashboard');
		// }

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
						toastr.error('Hubo un error.');
					});
			}
		}
	}
})();
