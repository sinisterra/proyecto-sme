/**
 * Created by lockonDaniel on 11/10/15.
 */
/**
 * Created by lockonDaniel on 11/8/15.
 */
/**
 * Created by lockonDaniel on 11/8/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('CondicionesRegresoController', CondicionesRegresoController);

    /** @ngInject */
    function CondicionesRegresoController() {
        var vm = this;

        vm.cuestionario = {};
        vm.radioGeneral                 =   [{name:"Si",value:1},{name:"No",value:2}];
        vm.radioFrasesResistencia       =   [
            {name:"Fui y soy parte de la organización y realización de actividades de forma permanente.",value:1},
            {name:"Fui parte de la organización y realización de actividades de forma no muy regular y/o asistí e informé a otros compañeros de mítines, asambleas, plantones)",value:2},
            {name:"Asistí a mítines, asambleas, plantones de manera ocasional",value:3},
            {name:"No asistí a actos del movimiento de resistencia",value:4},
            {name:"Ns/Nc",value:9}
        ];
        vm.radioResistencia             =   [{name:"Si",value:1,hasOther:"¿Cuál?"},{name:"No",value:2},{name:"NS/NC",value:9}];


    }
})();
