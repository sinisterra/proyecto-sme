(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('InfoPersonalController', InfoPersonalController);

	/* @ngInject */
	function InfoPersonalController(Restangular, $filter, toastr, _) {
		var vm = this;
		vm.title = 'InfoPersonalController';

		vm.today = new Date();

		activate();

		vm.submitFormPersonal = submitFormPersonal;
		vm.regexCURP = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;

		vm.submitFormExperiencia = submitFormExperiencia;

		// experiencia laboral

		vm.editExperiencia = editExperiencia;
		vm.removeExperiencia = removeExperiencia;

		function editExperiencia(exp) {
			//escape values
			vm.experiencia = exp;
		}

		function removeExperiencia(exp) {
			Restangular.one('ExperienciaLaboral', exp.id).remove().then(function(res) {
					vm.experienciaLaboral = _.without(vm.experienciaLaboral, exp);
				})
				.catch(function() {
					toastr.error('Hubo un error', 'Error');
				});
		}

		function submitFormPersonal(isValid) {

			if (isValid) {

				//proceder a enviar la forma

				vm.savingPersonal = true;

				savePersonal();

			}
		}

		function submitFormExperiencia(isValid) {
			if (isValid) {
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
					toastr.success('La información ha sido guardada correctamente.', '¡Éxito!');
					vm.savingPersonal = false;
					saveDireccion();
				})
				.catch(function(error) {
					toastr.error('La información no pudo guardarse correctamente ' + '(' + error.status + ')', 'Error');
					vm.savingPersonal = false;

				});
		}

		function saveDireccion() {
			var direccion = angular.copy(vm.direccion);
			var saveUrl;

			if (direccion.id) {
				delete direccion.id;
				delete direccion.idUsuario;
				saveUrl = Restangular.all('Direccion').customPUT(direccion);
			}
			else {
				direccion.idUsuario = vm.personal.idUsuario;
				saveUrl = Restangular.all('Direccion').customPOST(direccion);
			}

			saveUrl.then(function(res) {
					// toastr.success('La información ha sido guardada correctamente', '¡Éxito!');
					vm.savingPersonal = false;
				})
				.catch(function(error) {
					toastr.error('La información no pudo guardarse correctamente ' + '(' + error.status + ')', 'Error');
					vm.savingPersonal = false;

				});

		}

		function formatExperiencia(e) {
			e.FechaInicio = new Date(e.FechaInicio);
			e.FechaTermino = new Date(e.FechaTermino);
			e.RemuneracionBrutaMensual = Number(e.RemuneracionBrutaMensual);
			e.TelefonoSuperiorInmediato = Number(e.TelefonoSuperiorInmediato);

			return e;
		}

		function saveExperiencia() {
			var experiencia = angular.copy(vm.experiencia);

			// if(experiencia.idExperienciaEspecifica){
			// 	//editar
			// }
			// else{

			delete experiencia.campo;
			delete experiencia.area;
			experiencia.FechaInicio = $filter('date')(experiencia.FechaInicio, 'yyyy-MM-dd');
			experiencia.FechaTermino = $filter('date')(experiencia.FechaTermino, 'yyyy-MM-dd');

			if (experiencia.id) {
				Restangular.one('ExperienciaLaboral', experiencia.id).customPUT(experiencia).then(function(res) {
					// vm.experienciaLaboral.push(formatExperiencia(res.plain()));
					//BUSCAR EN vm.experiencia laboral y reemplazar
					toastr.success('Cambios guardados correctamente', '¡Éxito!');
				});
			}
			else {
				Restangular.all('ExperienciaLaboral').customPOST(experiencia).then(function(res) {
						vm.experienciaLaboral.push(formatExperiencia(res.plain()));
						toastr.success('Cambios guardados correctamente', '¡Éxito!');
					})
					.catch(function() {

					});
				// vm.experiencia = {};
			}

		}

		////////////////

		function activate() {
			vm.today = new Date();
			loadLocations();
			loadExperienceFields();

			loadPersonal();
			loadDireccion();
			loadExperiencia();
		}

		function loadExperienceFields() {
			Restangular.all('CampoDeExperiencia').customGET().then(function(res) {

					vm.camposExperiencia = res.campo_de_experiencia;

					vm.camposById = {};
					vm.areasByCampos = {};
					vm.expByAreas = {};

					vm.areasById = {};
					vm.expById = {};

					_.forEach(res.campo_de_experiencia, function(campo) {
						vm.camposById[campo.id] = campo;
						vm.areasByCampos[campo.id] = campo.area_de_experiencia;
						_.forEach(campo.area_de_experiencia, function(area) {
							vm.expByAreas[area.id] = area.experiencia_especifica;
							vm.areasById[area.id] = area;
							_.forEach(area.experiencia_especifica, function(exp) {
								vm.expById[exp.id] = exp;
							});

						});
					});

				})
				.catch(function() {

				});
		}

		function loadLocations() {
			vm.locationsLoaded = false;
			Restangular.all('Pais').customGET().then(function(res) {
				vm.states = res.paises[0].entidades_federativas;

				vm.locationsLoaded = true;

			}).catch(function(err) {
				vm.locationsLoaded = true;

			});
		}

		function loadPersonal() {
			vm.personalLoaded = false;

			Restangular.all('DatosPersonales').customGET()
				.then(function(res) {
					vm.personal = res.datosPersonales;

					// 
					//validar fecha
					vm.personal.FechaNacimiento = new Date(res.datosPersonales.FechaNacimiento);
					// $filter('date')(res.datosPersonales.FechaNacimiento,'yyyy-MM-dd');
					vm.personalLoaded = true;
				})
				.catch(function(err) {
					vm.personalLoaded = true;
				});
		}

		function loadDireccion() {
			Restangular.all('Direccion').customGET().then(function(res) {
					vm.direccion = res.plain().direccion;
				})
				.catch(function(err) {

				});
		}

		function loadExperiencia() {
			vm.experienciaLoaded = false;
			vm.experienciaLaboral = [];

			Restangular.all('ExperienciaLaboral').customGET().then(function(res) {
					vm.experienciaLaboral = res.plain().experienciaLaboral;
					vm.experienciaLoaded = true;

					if (vm.experienciaLaboral.length > 0) {

						vm.experienciaLaboral = _.map(vm.experienciaLaboral, function(e) {

							return formatExperiencia(e);
						});
					}

				})
				.catch(function(err) {
					vm.experienciaLoaded = true;
				});
		}
	}
})();
