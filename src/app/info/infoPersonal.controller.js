(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('InfoPersonalController', InfoPersonalController);

	/* @ngInject */
	function InfoPersonalController(Restangular, $filter, toastr, _) {
		var vm = this;

		// VALIDAR FECHAS
		vm.today = new Date();

		// PERSONAL/DIRECCIÓN
		vm.submitFormPersonal = submitFormPersonal;

		// EXPERIENCIA LABORAL
		vm.submitFormExperiencia = submitFormExperiencia;
		vm.editExperiencia = editExperiencia;
		vm.removeExperiencia = removeExperiencia;
		vm.resetFormExperiencia = resetFormExperiencia;

		// CERTIFICACIONES
		vm.submitFormCerts = submitFormCerts;
		vm.editCert = editCert;
		vm.removeCert = removeCert;
		vm.resetFormCerts = resetFormCerts;

		// LOGROS
		vm.submitFormLogro = submitFormLogro;
		vm.editLogro = editLogro;
		vm.removeLogro = removeLogro;
		vm.resetFormLogro = resetFormLogro;

		// IDIOMA
		vm.submitFormIdioma = submitFormIdioma;
		vm.editIdioma = editIdioma;
		vm.removeIdioma = removeIdioma;
		vm.resetFormIdioma = resetFormIdioma;

		// ESTADOS Y MUNICIPIOS
		function loadLocations() {
			vm.locationsLoaded = false;
			Restangular.all('Pais').customGET().then(function(res) {
				vm.states = res.paises[0].entidades_federativas;

				vm.locationsLoaded = true;

			}).catch(function(err) {
				vm.locationsLoaded = true;

			});
		}

		// CAMPOS, ÁREAS Y EXPERIENCIAS
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

		// PERSONAL
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
					toastSuccess();
					vm.savingPersonal = false;
					saveDireccion();
				})
				.catch(function(error) {
					toastError(error);
					vm.savingPersonal = false;

				});
		}

		function submitFormPersonal(isValid) {

			if (isValid) {

				//proceder a enviar la forma

				vm.savingPersonal = true;

				savePersonal();

			}
		}

		// DIRECCIÓN
		function loadDireccion() {
			Restangular.all('Direccion').customGET().then(function(res) {
					vm.direccion = res.plain().direccion;
				})
				.catch(function(err) {

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

		// EXPERIENCIA LABORAL
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
					toastSuccess();
				});
			}
			else {
				Restangular.all('ExperienciaLaboral').customPOST(experiencia).then(function(res) {
						vm.experienciaLaboral.push(formatExperiencia(res.plain()));
						toastSuccess();
					})
					.catch(function() {

					});
				// vm.experiencia = {};
			}
		}

		function submitFormExperiencia(isValid) {
			if (isValid) {
				saveExperiencia();
			}
		}

		function editExperiencia(exp) {
			//escape values
			vm.experiencia = exp;
		}

		function removeExperiencia(exp) {
			Restangular.one('ExperienciaLaboral', exp.id).remove().then(function(res) {
					vm.experienciaLaboral = _.without(vm.experienciaLaboral, exp);
				})
				.catch(function(error) {
					toastError(error);
				});
		}

		function resetFormExperiencia() {
			vm.experiencia = {};
		}

		// CERTIFICACIONES

		function loadCerts() {
			vm.certLoaded = false;
			Restangular.all('Certificacion').customGET().then(function(res) {
					vm.certs = res.plain().certificacion;
					vm.certLoaded = true;
				})
				.catch(function() {
					vm.certLoaded = true;
				});
		}

		function saveCert() {
			var cert = angular.copy(vm.cert);
			var saveUrl;
			vm.savingCert = true;

			if (cert.id) {
				saveUrl = Restangular.one('Certificacion', cert.id).customPUT(cert).then(function(res) {
						toastSuccess();
						vm.savingCert = false;
					})
					.catch(function(err) {
						toastError(err);
						vm.savingCert = false;
					});
			}
			else {
				saveUrl = Restangular.all('Certificacion').customPOST(cert).then(function(res) {
						toastSuccess();
						vm.certs.push(res.plain());
						vm.savingCert = false;
					})
					.catch(function(err) {
						toastError(err);
						vm.savingCert = false;
					});
			}
		}

		function submitFormCerts(isValid) {
			if (isValid) {
				saveCert();
			}
		}

		function editCert(cert) {
			vm.cert = cert;
		}

		function removeCert(cert) {
			Restangular.one('Certificacion', cert.id).remove().then(function() {
					toastSuccess();
					vm.certs = _.without(vm.certs, cert);
				})
				.catch(function(err) {
					toastError(err);
				});
		}

		function resetFormCerts() {
			vm.cert = {};
		}

		// LOGROS

		function loadLogros() {
			vm.logrosLoaded = false;

			Restangular.all('Logro').customGET().then(function(res) {
					vm.logros = _.map(res.plain().logro, formatLogro);
					vm.logrosLoaded = true;
				})
				.catch(function(err) {
					toastError(err);
					vm.logrosLoaded = true;
				});
		}

		function editLogro(logro) {
			vm.logro = logro;
		}

		function removeLogro(logro) {
			Restangular.one('Logro', logro.id).remove()
				.then(function() {
					vm.logros = _.without(vm.logros, logro);
				})
				.catch(function(err) {
					toastError(err);
				});
		}

		function resetFormLogro() {
			vm.logro = {};
		}

		function submitFormLogro(isValid) {
			if (isValid) {
				saveLogro();
			}
		}

		function saveLogro() {

			var logro = angular.copy(vm.logro);

			if (!logro.id) {
				Restangular.all('Logro').customPOST(logro).then(function(res) {
						vm.logros.push(res.plain());
					})
					.catch(function(err) {
						toastError(err);
					});
			}
			else {
				Restangular.one('Logro', logro.id).customPUT(logro).then(function() {
						toastSuccess();
					})
					.catch(function(err) {
						toastError(err);
					});
			}
		}

		function formatLogro(logro) {
			logro.Fecha = new Date(logro.Fecha);
			return logro;
		}

		// IDIOMAS

		function loadIdiomaFields() {
			vm.listaIdiomasLoaded = false;
			Restangular.all('Idioma').customGET().then(function(res) {
				vm.listaIdiomas = res.plain();
				vm.idiomasById = _.groupBy(res.plain(), 'id');
				vm.listaIdiomasLoaded = true;
			});

		}

		function loadIdiomas() {
			vm.idiomasLoaded = false;

			Restangular.all('IdiomaUsuario').customGET().then(function(res) {
				vm.idiomas = _.map(res.plain().idiomas, function(i) {
					i.pivot.id = i.id;
					return i.pivot;
				});

				vm.idiomasLoaded = true;
			}).
			catch(function() {
				vm.idiomasLoaded = true;
			});

		}

		function saveIdioma() {
			var idioma = angular.copy(vm.idioma);

			if (!idioma.id) {
				//crear
				Restangular.all('IdiomaUsuario').customPOST(idioma)
					.then(function() {
						vm.idiomas.push(idioma);
						toastSuccess();
					})
					.catch(function(err) {
						if (err[0] === "Idioma Ya Existente") {
							toastr.error('Ya has registrado este idioma', 'Error');
						}
						else {
							toastError(err);
						}
					});
			}
			else {
				var id = idioma.id;
				delete idioma.id;
				Restangular.one('IdiomaUsuario', id).customPUT(idioma).then(function() {
						toastSuccess();
					})
					.catch(function(err) {
						toastError(err);
					});
			}
		}

		function submitFormIdioma(isValid) {
			if (isValid) {
				saveIdioma();
			}
		}

		function editIdioma(idioma) {
			vm.idioma = idioma;
		}

		function removeIdioma(idioma) {
			Restangular.one('IdiomaUsuario', idioma.id).remove().then(function() {
				vm.idiomas = _.without(vm.idiomas, idioma);
				toastSuccess();
				if (vm.idioma.id === idioma.id) {
					resetFormIdioma();
				}
			});

		}

		function resetFormIdioma() {
			vm.idioma = {
				Materno: 0,
				NivelRedaccion: 50,
				NivelConversacion: 50,
				NivelLectura: 50
			};
		}

		////////////////

		function activate() {
			vm.today = new Date();
			loadLocations();
			loadExperienceFields();
			loadIdiomaFields();

			loadPersonal();
			loadDireccion();
			loadExperiencia();
			loadCerts();
			loadIdiomas();
			loadLogros();
		}

		function toastSuccess() {
			toastr.success('La información se ha modificado correctamente.', '¡Éxito!');
		}

		function toastError(err) {
			toastr.error('Hubo un error al guardar la información (' + err.status + ')', 'Error');
		}

		activate();

	}
})();
