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
        .controller('ConsecuenciasController', ConsecuenciasController);

    /** @ngInject */

    function ConsecuenciasController($scope) {
        var vm = this;

        vm.encuesta = {preguntas:[],encuesta:2};

        vm.arrayNumber = {};

        $scope.$watchCollection('vm.encuesta',watchFunction);

        function watchFunction(newValue,oldValue)
        {
            vm.numPreguntas = vm.encuesta.length;
        }

        /*
            Opciones para las preguntas
         */

        vm.radioGeneral                 =   [{name:"Si",value:1},{name:"No",value:2}];
        vm.radioFrasesResistencia       =   [
                                                {name:"Fui y soy parte de la organización y realización de actividades de forma permanente.",value:1},
                                                {name:"Fui parte de la organización y realización de actividades de forma no muy regular y/o asistí e informé a otros compañeros de mítines, asambleas, plantones)",value:2},
                                                {name:"Asistí a mítines, asambleas, plantones de manera ocasional",value:3},
                                                {name:"No asistí a actos del movimiento de resistencia",value:4},
                                                {name:"Ns/Nc",value:9}
                                            ];
        vm.radioResistencia             =   [{name:"Si",value:1,hasOther:"¿Cuál?"},{name:"No",value:2},{name:"NS/NC",value:9}];

        vm.actividadesResistencia       =   getActividadesResistencia();
        vm.otrasActividades             =   getOtrasActividades();
        vm.ayudaEconomica               =   getAyudaEconomica();
        vm.participacionOrganizacion    =   getParticipacionOrganizacion();
        vm.impactoEconomia              =   getImpactoEconomia();
        vm.enfermedades                 =   getEnfermedades();
        vm.enfermedadesEmocionales      =   getEnfermedadesEmocionales();
        vm.adicciones                   =   getAdicciones();
        vm.consecuencias                =   getConsecuencias();
        vm.integracionFamiliar          =   getIntegracionFamiliar();
        vm.relacionesSociales           =   getRelacionesSociales();
        vm.submitForm                   =   submitForm;


        function getActividadesResistencia()
        {
            var actividades = {
                items:[
                    {id:'10a',default:"9",text:"Te empleaste por un salario"},
                    {id:'10b',default:"9",text:"Iniciaste alguna actividad por tu cuenta, con un ingreso económico personal o familiar"},
                    {id:'10c',default:"9",text:"Realizaste algún trabajo profesional independiente"},
                    {id:'10d',default:"9",text:"Estuviste desempleado"},
                    {id:'10e',default:"9",text:"Otro",hasOther:"¿Cuál?",showWhenValue:1}
                ],
                options:[{name:"Si, de forma permanente", value:1},{name:"Si, de forma eventual", value:2},{name:"No", value:3}]
            }
            return actividades;
        }

        function getOtrasActividades()
        {
            var actividades = {
                items:[
                    {id:'11a',default:"9",text:"Actividades del hogar e hijos",subModel:"Hogar"},
                    {id:'11b',default:"9",text:"Trabajo familiar no remunerado",subModel:"TrabajoFamiliar"},
                    {id:'11c',default:"9",text:"Estudios escolarizados",subModel:"Estudios"},
                    {id:'11d',default:"9",text:"Tomé cursos de capacitación",subModel:"Cursos"},
                    {id:'11e',default:"9",text:"Otro",subModel:"Otro"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2}]
            }
            return actividades;
        }

        function getAyudaEconomica()
        {
            var ayuda = {
                items:[
                    {id:'14a',default:9,text:"Familiares",subModel:"Familiares"},
                    {id:'14b',default:9,text:"Instituciones Públicas",subModel:"InstitucionesPublicas"},
                    {id:'14c',default:9,text:"Organizaciones Sociales",subModel:"OrganizacionesSociales"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:9}]
            }
            return ayuda;
        }

        function getParticipacionOrganizacion()
        {
            var participacion = {
                items:[
                    {id:'15a',default:9,text:"Alguna organización cultural o deportiva",subModel:"Cultural"},
                    {id:'15b',default:9,text:"Acciones de beneficio social",subModel:"BeneficioSocial"},
                    {id:'15c',default:9,text:"Alguna organización política",subModel:"Politica"},
                    {id:'15d',default:9,text:"Asistía a la escuela/capacitación",subModel:"Escuela"},
                    {id:'15e',default:9,text:"Ninguna",subModel:"Ninguna"},
                    {id:'15f',default:9,text:"Otra",subModel:"Otra"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return participacion;
        }

        function getImpactoEconomia()
        {
            var impacto = {
                items:[
                    {id:'18a',default:9,text:"Adquisición de deudas",subModel:"Deudas"},
                    {id:'18b',default:9,text:"Perdida de bienes",subModel:"PerdidaBienes"},
                    {id:'18c',default:9,text:"Insolvencia para cumplir pagos",subModel:"Insolvencia"},
                    {id:'18d',default:9,text:"Dejaron de estudiar hijos para ayudar a la economía familiar",subModel:"AbandonoEscuela"},
                    {id:'18e',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return impacto;
        }

        function getEnfermedades()
        {
            var enfermedades = {
                items:[
                    {id:'19a',default:9,text:"Diabetes",subModel:"Diabetes"},
                    {id:'19b',default:9,text:"Enfermedades cardiovasculares",subModel:"CardioVascular"},
                    {id:'19c',default:9,text:"Enfermedades gastrointestinales",subModel:"GastroIntestinal"},
                    {id:'19d',default:9,text:"Enfermedades respiratorias",subModel:"Respiratorias"},
                    {id:'19e',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {id:'19f',default:9,text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }
        function getEnfermedadesEmocionales()
        {
            var enfermedades = {
                items:[
                    {id:'20a',default:9,text:"Depresión",subModel:"Depresion"},
                    {id:'20b',default:9,text:"Estrés",subModel:"Estres"},
                    {id:'20c',default:9,text:"Ansiedad",subModel:"Ansiedad"},
                    {id:'20d',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {id:'20e',default:9,text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getAdicciones()
        {
            var enfermedades = {
                items:[
                    {id:'21a',default:9,text:"Alcoholismo",subModel:"Alcoholismo"},
                    {id:'21b',default:9,text:"Drogadicción",subModel:"Drogadiccion"},
                    {id:'21c',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {id:'21d',default:9,text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getConsecuencias()
        {
            var consecuencias = {
                items:[
                    {id:'22a',default:9,text:"Muerte de algún familiar",subModel:"Muerte"},
                    {id:'22b',default:9,text:"Suicidio de algún familiar",subModel:"Suicidio"},
                    {id:'22c',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {id:'22d',default:9,text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return consecuencias;
        }

        function getIntegracionFamiliar()
        {
            var problemas = {
                items:[
                    {id:'23a',default:9,text:"Problemas en la familia",subModel:"ProblemasFamiliares"},
                    {id:'23b',default:9,text:"Consolidó la unión familiar",subModel:"ConsolidacionFamiliar"},
                    {id:'23c',default:9,text:"Separación de integrantes",subModel:"Separacion"},
                    {id:'23d',default:9,text:"Mejoró mi calidad de vida",subModel:"MejoraCalidadDeVida"},
                    {id:'23e',default:9,text:"Divorcio",subModel:"Divorcio"},
                    {id:'23f',default:9,text:"Me abrió mejores oportunidades de empleo en beneficio de mi familia",subModel:"MejoresOportunidades"},
                    {id:'23g',default:9,text:"Pérdida de patria potestad de hijos",subModel:"PerdidaPatriaPotestad"},
                    {id:'23h',default:9,text:"Truncó la educación de hijos o la de usted mismo",subModel:"EducacionTrunca"},
                    {id:'23i',default:9,text:"Pérdida de bienes (casas, autos, otros)",subModel:"PerdidaDeVienes"},
                    {id:'23j',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return problemas;
        }

        function getRelacionesSociales()
        {
            var relaciones = {
                items:[
                    {id:'24a',default:9,text:"Pérdida de amistades",subModel:"PerdidaAmistades"},
                    {id:'24b',default:9,text:"Rechazo de vecinos y otros grupos sociales",subModel:"Rechazo"},
                    {id:'24c',default:9,text:"Aislamiento personal",subModel:"Aislamiento"},
                    {id:'24d',default:9,text:"Rechazo laboral",subModel:"Rechazo"},
                    {id:'24e',default:9,text:"Identificación con otros grupos sociales",subModel:"IdentificacionOtrosGrupos"},
                    {id:'24f',default:9,text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return relaciones;
        }




        function submitForm(isValid)
        {
            console.log(vm.encuesta);
        }





    }
})();
