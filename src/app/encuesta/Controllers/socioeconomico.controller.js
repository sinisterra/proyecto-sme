(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('SocioeconomicoController', SocioeconomicoController);

	/* @ngInject */
	function SocioeconomicoController($state,Restangular,toastr) {
		var vm = this;
		vm.title = 'SocioeconomicoController';
		vm.encuesta = { preguntas: [], encuesta: 5};

		vm.submitForm 	= submitForm;
		vm.activate 	= activate();
		////////////////


			vm.radioGeneral = [{
				name: "Si",
				value: 1
			}, {
				name: "No",
				value: 2
			}];

			//
			vm.DOptions = [{
				name: 'Hasta $2,600',
				value: 1
			}, {
				name: '$2,601-$6,000',
				value: 2
			}, {
				name: '$6,001-$10,000',
				value: 3
			}, {
				name: '$10,001-$32,000',
				value: 4
			}, {
				name: 'Más de $32,000',
				value: 5
			}
			];

			vm.EOptions = [{
				value: 1,
				name: 'Sector público (no maestro)'
			}, {
				value: 2,
				name: 'Trabajador por cuenta propia'
			}, {
				value: 3,
				name: 'Sector privado (no maestro)'
			}, {
				value: 4,
				name: 'Sector agropecuario'
			}, {
				value: 5,
				name: 'Obrero'
			}, {
				value: 6,
				name: 'Ama de casa'
			}, {
				value: 10,
				name: 'Jubilado'
			}, {
				value: 11,
				name: 'Desempleado'
			},
				{
				value: 98,
				name: 'Otro',hasOther:'¿Cuál?'
			}];

			vm.FOptions = [{
				value: 1,
				name: 'Sí, sólo tengo teléfono en mi casa'
			}, {
				value: 2,
				name: 'Sí, sólo tengo celular'
			}, {
				value: 3,
				name: 'No tengo teléfono'
			}, {
				value: 4,
				name: 'Tengo ambos'
			}];

			vm.GOptions = [{
				value: 1,
				name: 'No estudió'
			}, {
				value: 2,
				name: 'Primaria incompleta'
			}, {
				value: 3,
				name: 'Primaria completa'
			}, {
				value: '1-1',
				name: ' Secundaria incompleta'
			}, {
				value: '2-1',
				name: ' Secundaria completa'
			}, {
				value: '3-1',
				name: ' Carrera comercial'
			}, {
				value: 4,
				name: ' Carrera técnica'
			}, {
				value: 8,
				name: 'Preparatoria incompleta'
			}, {
				value: 9,
				name: 'Preparatoria completa'
			}, {
				value: 10,
				name: ' Licenciatura incompleta'
			}, {
				value: 11,
				name: ' Licenciatura completa'
			}, {
				value: 12,
				name: ' Diplomado o Maestría'
			}, {
				value: 13,
				name: ' Doctorado'
			}];

			vm.HOptions = [{
				value: 1,
				name: 'Uno'
			}, {
				value: 2,
				name: 'Dos '
			}, {
				value: 3,
				name: 'Tres'
			}, {
				value: 4,
				name: 'Cuatro'
			}, {
				value: 5,
				name: 'Cinco'
			}, {
				value: 6,
				name: 'Seis'
			}, {
				value: 7,
				name: 'Siete o más'
			}];


			vm.IOptions = [{
				value: 1,
				name: 'Cero'
			}, {
				value: 2,
				name: 'Uno'
			}, {
				value: 3,
				name: 'Dos'
			}, {
				value: 4,
				name: 'Tres'
			}, {
				value: 5,
				name: 'Cuatro o más'
			}];

			// JOPTIONS - general

			vm.KOptions = [{
				value: 1,
				name: 'Cinco o menos'
			}, {
				value: 2,
				name: 'Entre seis y diez'
			}, {
				value: 3,
				name: 'Entre once y quince'
			}, {
				value: 4,
				name: 'Entre dieciséis y veinte'
			}, {
				value: 5,
				name: 'Veintiuno o más'
			}];

			vm.LOptions = [{
				value: 1,
				name: 'Tierra'
			}, {
				value: 2,
				name: 'Cemento'
			}, {
				value: 3,
				name: 'Otro tipo de material o acabo',
				hasOther: '¿Cuál?'
			}];

		function  activate()
		{
			vm.nivel = localStorage.nivel;
			if(vm.nivel!=4)
				$state.go('encuesta', {}, {reload: true});
		}


		function submitForm(valid)
		{
			// console.log(vm.encuesta);

			Restangular.all('Cuestionario').customPOST(vm.encuesta).then(function(res){
				localStorage.setItem('nivel',vm.encuesta.encuesta);
				$state.go('encuesta', {}, {reload: true});
				//$rootScope.$emit('rootScope:emit', ''); // $rootScope.$on
				toastr.success('Haz concluido el Censo. Muchas gracias por tu participación');

			}).catch(function(err){
				toastr.error('Error al guardar éste bloque('+err.status+')')
			});
		}


	}
})();
