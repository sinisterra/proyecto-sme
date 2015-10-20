(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('InfoPersonalController', InfoPersonalController);

	/* @ngInject */
	function InfoPersonalController(Restangular, $filter, toastr) {
		var vm = this;
		vm.title = 'InfoPersonalController';

		vm.today = new Date();

		activate();

		vm.submitFormPersonal = submitFormPersonal;
		vm.submitFormExperiencia = submitFormExperiencia;

		function submitFormPersonal(isValid) {

			if (isValid) {

				//proceder a enviar la forma

				vm.savingPersonal = true;

				savePersonal();

			}
		}

		function submitFormExperiencia(isValid){
			if(isValid){
				saveExperiencia();
			}
		}

		function savePersonal() {
			var personal = angular.copy(vm.personal);
			var saveUrl;

			personal.FechaNacimiento = $filter('date')(vm.personal.FechaNacimiento, 'yyyy-MM-dd');

			if (personal.id) {
				delete personal.id;
				delete personal.idUsuario;
				saveUrl = Restangular.all('DatosPersonales').customPUT(personal);
			}
			else {
				saveUrl = Restangular.all('DatosPersonales').customPOST(personal);
			}

			saveUrl.then(function(res) {
					// debugger
					toastr.success('La información ha sido guardada correctamente.', '¡Éxito!');
					vm.savingPersonal = false;
				})
				.catch(function(error) {
					toastr.error('La información no pudo guardarse correctamente ' + '(' + error.status + ')', 'Error');
					vm.savingPersonal = false;

				});
		}

		function saveDireccion() {
			var direccion = angular.copy(vm.direccion);
			var saveUrl;

		}

		function saveExperiencia(){
			var experiencia = angular.copy(vm.experiencia);
			

			// if(experiencia.idExperienciaEspecifica){
			// 	//editar
			// }
			// else{
				vm.experienciaLaboral.push(experiencia);
				delete experiencia.campo;
				delete experiencia.area;
				experiencia.FechaInicio = $filter('date')(experiencia.FechaInicio, 'yyyy-MM-dd');
				experiencia.FechaTermino = $filter('date')(experiencia.FechaTermino, 'yyyy-MM-dd');

				Restangular.all('ExperienciaLaboral').customPOST(experiencia).then(function(res){
					debugger
				})
				.catch(function(){
					debugger
				});
				// vm.experiencia = {};
			// }

		}



		////////////////

		function activate() {
			vm.today = new Date();
			loadLocations();
			loadExperienceFields();
			loadPersonal();
			loadExperiencia();
		}

		function loadExperienceFields(){
			Restangular.all('CampoDeExperiencia').customGET().then(function(res){
				debugger
				vm.camposExperiencia = res.campo_de_experiencia;
			})
			.catch(function(){
				debugger
			})
		}

		function loadLocations(){
			vm.locationsLoaded = false;
			Restangular.all('Pais').customGET().then(function(res){
				vm.states = res.paises[0].entidades_federativas;

				vm.locationsLoaded = true;
				
			}).catch(function(err){
					vm.locationsLoaded = true;
					
			});
		}

		function loadPersonal(){
			vm.personalLoaded = false;

			Restangular.all('DatosPersonales').customGET()
				.then(function(res) {
					vm.personal = res.datosPersonales;

					// debugger
					//validar fecha
					vm.personal.FechaNacimiento = new Date(res.datosPersonales.FechaNacimiento);
					// $filter('date')(res.datosPersonales.FechaNacimiento,'yyyy-MM-dd');
					vm.personalLoaded = true;
				})
				.catch(function(err) {
					vm.personalLoaded = true;
				});
		}

		function loadExperiencia(){
			vm.experienciaLoaded = false;
			vm.experienciaLaboral = [];

			Restangular.all('ExperienciaLaboral').customGET().then(function(res){
				vm.experienciaLaboral = res.plain().experienciaLaboral;
				vm.experienciaLoaded = true;

				// vm.experiencia = {};

				// vm.experiencia.FechaInicio = new Date(res.experienciaLaboral.FechaInicio);
				// vm.experiencia.FechaTermino = new Date(res.experienciaLaboral.FechaTermino);
			})
			.catch(function(err){
				vm.experienciaLoaded = true;
			});
		}
	}
})();
