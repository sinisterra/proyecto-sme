(function() {
  'use strict';

  angular
    .module('appSme')
    .controller('ProyectosController', ProyectosController);

  /* @ngInject */
  function ProyectosController(Restangular, toastr) {
    var vm = this;
    vm.title = 'ProyectosController';
    vm.encuesta = {
      preguntas: [],
      encuesta: 1
    };

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

    vm.sendForm = sendForm;

    vm.q38Data = {
      'items': [{
        id: '35a',
        text: 'Asamblea de usuarios'
      }, {
        id: '35b',
        text: 'OPT (Organización Política del Pueblo y los Trabajadores)'
      }, {
        id: '35c',
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
          id: '37a',
          text: 'Mesa de quejas',
          default: 9
        }, {
          id: '37b',
          text: 'Reconexiones',
          default: 9
        }, {
          id: '37c',
          text: 'Asamblea de usuarios',
          default: 9
        }, {
          id: '37d',
          text: 'En todas',
          default: 9
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
        id: '40a',
        text: 'Internet y Redes Sociales',
        default: 9
      }, {
        id: '40b',
        text: 'Medios Alternativos (RadioSME, Desinformemos, etc.)',
        default: 9
      }, {
        id: '40c',
        text: 'Periódicos',
        default: 9
      }, {
        id: '40d',
        text: 'Radio',
        default: 9
      }, {
        id: '40e',
        text: 'Conversación con familiares y amigos',
        default: 9
      }, {
        id: '40f',
        text: 'Centros de reunión social',
        default: 9
      }, {
        id: '40g',
        text: 'Volantes y folletos',
        default: 9
      }, {
        id: '40h',
        text: 'Televisión',
        default: 9
      }, {
        id: '40i',
        text: 'Asambleas sindicales',
        default: 9
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

    vm.q45Options = [{
      name: 'Facebook',
      value: 1
    }, {
      name: 'Twitter',
      value: 2
    }, {
      name: 'RadioSME',
      value: 3
    }];

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

    function sendForm(){
      Restangular.all('Cuestionario').customPOST(vm.encuesta).then(function(){
        toastr.success('Datos guardados correctamente.');
      })
      .catch(function(err){
        toastr.error('Error al guardar la información.'+'('+err.status+')');
      });
    }



  }
})();
