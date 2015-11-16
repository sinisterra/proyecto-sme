/**
 * Created by lockonDaniel on 11/8/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('TrabajoController', TrabajoController);

    /* @ngInject */
    function TrabajoController($rootScope,Restangular, toastr) {
        var vm = this;
        vm.rootScope        = $rootScope;
        vm.submitForm       = submitForm;
        vm.encuesta         = {preguntas:[],encuesta:1};
        vm.tableOptions     =
            [
                {
                    items:
                        [
                            {id:"5a",default:"9",text:"El número de años que realizaste tu actividad laboral",subModel:"Tiempo"},
                            {id:"5b",default:"9",text:"La diversidad y tipos de trabajos que realizaste antes de ocupar tu último puesto",subModel:"Diversidad"},
                            {id:"5c",default:"9",text:"Tu asistencia a cursos, capacitaciones, adiestramiento y seminarios que se ofrecieron en la CLyFC",subModel:"Cursos"},
                            {id:"5d",default:"9",text:"Tus habilidades y aptitudes personales",subModel:"Habilidades"},
                            {id:"5e",default:"9",text:"El grado escolar o profesional que posees ",subModel:"Escolaridad"}
                        ],
                    options:
                        [
                            {name:'Muy importante',value:1},
                            {name:'Algo importante',value:2},
                            {name:'Poco Importante',value:3},
                            {name:'Nada Importante',value:4},
                            {name:'No se',value:9}
                        ]
                }
            ]   ;
        vm.options = [
            [{name:'Hombre',value:1},{name:'Mujer',value:2}],
            [
                {text:'Supervision',value:1},
                {text:'Mando',value:2},
                {text:'Operativo',value:3},
                {text:'Administrativo',value:4},
                {text:'Servicios',value:5},
                {text:'Planeación',value:6},
                {text:'Organizativo',value:7},
                {text:'Otro',value:8,hasOther:'Anotar aquí'},
                {text:'No se',value:99}
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
                {text:'No estudió',value:1},
                {text:'Primaria Incompleta',value:2},
                {text:'Primaria Completa',value:3},
                {text:'Secundaria Incompleta',value:4},
                {text:'Secundaria Completa',value:5},
                {text:'Carrera Comercial',value:6},
                {text:'Carrera Técnica',value:7,hasOther:'¿Cuál?'},
                {text:'Preparatoria Incompleta',value:8},
                {text:'Preparatoria Completa',value:9},
                {text:'Licenciatura Incompleta',value:10},
                {text:'Licenciatura Completa',value:11,hasOther:"¿Cuál?"},
                {text:'Diplomado o Maestría',value:12,hasOther:"¿Cuál?"},
                {text:'Doctorado',value:13,hasOther:"¿Cuál?"},
                {text:'No Se',value:99}
            ];
            return escolaridades;

        }


        function submitForm(valid)
        {
            Restangular.all('Cuestionario').customPOST(vm.encuesta).then(function(res){
                localStorage.setItem('nivel',1);
                $rootScope.$emit('rootScope:emit', ''); // $rootScope.$on
                toastr.success('Se ha guardado éste bloque, prosigue al siguiente');

            }).catch(function(err){
                toastr.error('Error al guardar éste bloque('+err.status+')')
            });
        }



    }
})();
