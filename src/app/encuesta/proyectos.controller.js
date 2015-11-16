(function() {
	'use strict';

	angular
		.module('appSme')
		.controller('ProyectosController', ProyectosController);

	/* @ngInject */
	function ProyectosController() {
		var vm = this;
		vm.title = 'ProyectosController';
		vm.encuesta         = {preguntas:[],encuesta:1};


		vm.radioGeneral = [{
			name: "Si",
			value: 1
		}, {
			name: "No",
			value: 2
		}, {
			name: "Ns/Nc",
			value: 9
		}];

		vm.q38Data = {
			'items': [{
				submodel: 'a',
				text: 'Asamblea de usuarios'
			}, {
				submodel: 'b',
				text: 'OPT (Organización Política del Pueblo y los Trabajadores)'
			}, {
				submodel: 'c',
				text: 'Impulso de una nueva central de trabajadores'
			}, ],
			'options': [{
				name: "Si",
				value: 1
			}, {
				name: "No",
				value: 2
			}, {
				name: "No se",
				value: 99
			}]
		};

		vm.q40Data = {
			items: [{
				submodel: 'a',
				text: 'Mesa de quejas'
			}, {
				submodel: 'b',
				text: 'Reconexiones'
			}, {
				submodel: 'c',
				text: 'Asamblea de usuarios'
			}, {
				submodel: 'd',
				text: 'En todas'
			},

			],
			options: [{
				name: "Si",
				value: 1
			}, {
				name: "No",
				value: 2
			}, {
				name: "Ns/Nc",
				value: 9
			}],
		};

		vm.q43Options = [{
			value: 1,
			name: 'Alianzas con partidos políticos'
		}, {
			value: 2,
			name: 'Alianzas con otros sindicatos'
		}, {
			value: 3,
			name: 'Paros, huelgas de hambre, plantones'
		}, {
			value: 4,
			name: 'Crear Nuevos Instrumentos de Lucha'
		}, {
			value: 9,
			name: 'Ns/Nc'
		}];

		vm.q44Data = {
			items: [{
				submodel: 'a',
				text: 'Internet y Redes Sociales'
			}, {
				submodel: 'b',
				text: 'Medios Alternativos (RadioSME, Desinformemos, etc.)'
			}, {
				submodel: 'c',
				text: 'Periódicos'
			}, {
				submodel: 'd',
				text: 'Radio'
			}, {
				submodel: 'e',
				text: 'Conversación con familiares y amigos'
			}, {
				submodel: 'f',
				text: 'Centros de reunión social'
			}, {
				submodel: 'g',
				text: 'Volantes y folletos'
			}, {
				submodel: 'h',
				text: 'Televisión'
			}, {
				submodel: 'i',
				text: 'Asambleas sindicales'
			}],
			options: [{
				value: 1,
				name: 'Mucho'
			}, {
				value: 2,
				name: 'Algo'
			}, {
				value: 3,
				name: 'Poco'
			}, {
				value: 4,
				name: 'Nada'
			}, {
				value: 9,
				name: 'Ns/Nc'
			}]

		};

		vm.q45Options = [{name:'Facebook'},{name:'Twitter'},{name:'RadioSME'}];

		vm.q46Options = [{
			value: 1,
			name: 'Nacional / Política nacional'
		}, {
			value: 2,
			name: 'Internacional'
		}, {
			value: 3,
			name: 'Economía / Negocios'
		}, {
			value: 4,
			name: 'Espectáculos / Moda / Entretenimiento'
		}, {
			value: 5,
			name: 'Deportes'
		}, {
			value: 6,
			name: 'Policía / Roja'
		}, {
			value: 7,
			name: 'Otro'
		}, {
			value: 99,
			name: 'Ns/Nc'
		}];

		vm.q48Options = [{
			value: 1,
			name: "Espectáculos y moda"
		}, {
			value: 2,
			name: "Política"
		}, {
			value: 3,
			name: "Economía y negocios"
		}, {
			value: 4,
			name: "Otro"
		}, {
			value: 9,
			name: " Ns/Nc"
		}];

		vm.q51Options = [{
			value: 1,
			name: "IMSS"
		}, {
			value: 2,
			name: "Médico particular"
		}, {
			value: 3,
			name: "DIF"
		}, {
			value: 4,
			name: "Centro de salud de asistencia privada"
		}, {
			value: 5,
			name: "Seguro Popular"
		}, {
			value: 6,
			name: "ISSSTE"
		}, {
			value: 7,
			name: "Instituciones de la Secretaría de Salud Federal y/o Estatal"
		}, {
			value: 8,
			name: "Otro"
		}, {
			value: 99,
			name: "Ns/Nc"
		}];

		vm.q42Options = [{
			name: '1',
			value: 1
		}, {
			name: '2',
			value: 2
		}, {
			name: '3',
			value: 3
		}, {
			name: '4',
			value: 4
		}, {
			name: '5',
			value: 5
		}, {
			name: '6',
			value: 6
		}, {
			name: '7',
			value: 7
		}, {
			name: '8',
			value: 8
		}, {
			name: '9',
			value: 9
		}, {
			name: '10',
			value: 10
		}];

		activate();

		function activate() {}
	}
})();
