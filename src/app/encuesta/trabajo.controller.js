/**
 * Created by lockonDaniel on 11/8/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('TrabajoController', TrabajoController);

    /** @ngInject */
    function TrabajoController() {
        var vm = this;

        vm.cuestionario = {Actividades:[],OtrasActividades:[]};

        vm.tableOptions =
            [
                {
                    items:
                        [
                            {text:"El número de años que realizaste tu actividad laboral",subModel:"Tiempo"},
                            {text:"La diversidad y tipos de trabajos que realizaste antes de ocupar tu último puesto",subModel:"Diversidad"},
                            {text:"Tu asistencia a cursos, capacitaciones, adiestramiento y seminarios que se ofrecieron en la CLyFC",subModel:"Cursos"},
                            {text:"Tus habilidades y aptitudes personales",subModel:"Habilidades"},
                            {text:"El grado escolar o profesional que posees ",subModel:"Escolaridad"}
                        ],
                    options:
                        [
                            {name:'Muy importante',value:1},
                            {name:'Algo importante',value:2},
                            {name:'Poco Importante',value:3},
                            {name:'Nada Importante',value:4},
                            {name:'No se',value:99}
                        ]
                }
            ]   ;

        vm.options = [
            [{name:'Hombre',value:1},{name:'Mujer',value:2}],
            [
                {Nombre:'Supervision',id:1},
                {Nombre:'Mando',id:2},
                {Nombre:'Operativo',id:3},
                {Nombre:'Administrativo',id:4},
                {Nombre:'Servicios',id:5},
                {Nombre:'Planeación',id:6},
                {Nombre:'Organizativo',id:7},
                {Nombre:'Otro',id:8,hasOther:'Anotar aquí'},
                {Nombre:'No se',id:99}
            ],
            [
                {name:'Muy importante',value:1},
                {name:'Algo importante',value:2},
                {name:'Poco Importante',value:3},
                {name:'Nada Importante',value:4},
                {name:'No se',value:99}
            ]
        ];


        vm.escolaridades = getEscolaridades();

        function getEscolaridades()
        {

            var escolaridades= [
                {Nombre:'No estudió',id:1},
                {Nombre:'Primaria Incompleta',id:2},
                {Nombre:'Primaria Completa',id:3},
                {Nombre:'Secundaria Incompleta',id:4},
                {Nombre:'Secundaria Completa',id:5},
                {Nombre:'Carrera Comercial',id:6},
                {Nombre:'Carrera Técnica',id:7,hasOther:'¿Cuál?'},
                {Nombre:'Preparatoria Incompleta',id:8},
                {Nombre:'Preparatoria Completa',id:9},
                {Nombre:'Licenciatura Incompleta',id:10},
                {Nombre:'Licenciatura Completa',id:11,hasOther:"¿Cuál?"},
                {Nombre:'Diplomado o Maestría',id:12,hasOther:"¿Cuál?"},
                {Nombre:'Doctorado',id:13,hasOther:"¿Cuál?"},
                {Nombre:'No Se',id:99}
            ];
            return escolaridades;

        }



    }
})();
