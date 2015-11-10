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
    function ConsecuenciasController() {
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

        function getActividadesResistencia()
        {
            var actividades = {
                items:[
                    {text:"Te empleaste por un salario",subModel:"Empleado"},
                    {text:"Iniciaste alguna actividad por tu cuenta, con un ingreso económico personal o familiar",subModel:"EmpleoPropio"},
                    {text:"Realizaste algún trabajo profesional independiente",subModel:"Independiente"},
                    {text:"Estuviste desempleado",subModel:"Desempleado"},
                    {text:"Otro",subModel:"Otro"}
                ],
                options:[{name:"Si, de forma permanente", value:1},{name:"Si, de forma eventual", value:2},{name:"No", value:3},{name:"No se", value:99}]
            }
            return actividades;
        }

        function getOtrasActividades()
        {
            var actividades = {
                items:[
                    {text:"Actividades del hogar e hijos",subModel:"Hogar"},
                    {text:"Trabajo familiar no remunerado",subModel:"TrabajoFamiliar"},
                    {text:"Estudios escolarizados",subModel:"Estudios"},
                    {text:"Tomé cursos de capacitación",subModel:"Cursos"},
                    {text:"Otro",subModel:"Otro"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return actividades;
        }

        function getAyudaEconomica()
        {
            var ayuda = {
                items:[
                    {text:"Familiares",subModel:"Familiares"},
                    {text:"Instituciones Públicas",subModel:"InstitucionesPublicas"},
                    {text:"Organizaciones Sociales",subModel:"OrganizacionesSociales"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return ayuda;
        }

        function getParticipacionOrganizacion()
        {
            var participacion = {
                items:[
                    {text:"Alguna organización cultural o deportiva",subModel:"Cultural"},
                    {text:"Acciones de beneficio social",subModel:"BeneficioSocial"},
                    {text:"Alguna organización política",subModel:"Politica"},
                    {text:"Asistía a la escuela/capacitación",subModel:"Escuela"},
                    {text:"Ninguna",subModel:"Ninguna"},
                    {text:"Otra",subModel:"Otra"}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return participacion;
        }

        function getImpactoEconomia()
        {
            var impacto = {
                items:[
                    {text:"Adquisición de deudas",subModel:"Deudas"},
                    {text:"Perdida de bienes",subModel:"PerdidaBienes"},
                    {text:"Insolvencia para cumplir pagos",subModel:"Insolvencia"},
                    {text:"Dejaron de estudiar hijos para ayudar a la economía familiar",subModel:"AbandonoEscuela"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return impacto;
        }

        function getEnfermedades()
        {
            var enfermedades = {
                items:[
                    {text:"Diabetes",subModel:"Diabetes"},
                    {text:"Enfermedades cardiovasculares",subModel:"CardioVascular"},
                    {text:"Enfermedades gastrointestinales",subModel:"GastroIntestinal"},
                    {text:"Enfermedades respiratorias",subModel:"Respiratorias"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }
        function getEnfermedadesEmocionales()
        {
            var enfermedades = {
                items:[
                    {text:"Depresión",subModel:"Depresion"},
                    {text:"Estrés",subModel:"Estres"},
                    {text:"Ansiedad",subModel:"Ansiedad"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getAdicciones()
        {
            var enfermedades = {
                items:[
                    {text:"Alcoholismo",subModel:"Alcoholismo"},
                    {text:"Drogadicción",subModel:"Drogadiccion"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getConsecuencias()
        {
            var enfermedades = {
                items:[
                    {text:"Muerte de algún familiar",subModel:"Muerte"},
                    {text:"Suicidio de algún familiar",subModel:"Suicidio"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1},
                    {text:"Ninguna",subModel:"Ninguna",hasConflict:1,conflictValue:1,setAllValue:2}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getIntegracionFamiliar()
        {
            var enfermedades = {
                items:[
                    {text:"Problemas en la familia",subModel:"ProblemasFamiliares"},
                    {text:"Consolidó la unión familiar",subModel:"ConsolidacionFamiliar"},
                    {text:"Separación de integrantes",subModel:"Separacion"},
                    {text:"Mejoró mi calidad de vida",subModel:"MejoraCalidadDeVida"},
                    {text:"Divorcio",subModel:"Divorcio"},
                    {text:"Me abrió mejores oportunidades de empleo en beneficio de mi familia",subModel:"MejoresOportunidades"},
                    {text:"Pérdida de patria potestad de hijos",subModel:"PerdidaPatriaPotestad"},
                    {text:"Truncó la educación de hijos o la de usted mismo",subModel:"EducacionTrunca"},
                    {text:"Pérdida de bienes (casas, autos, otros)",subModel:"PerdidaDeVienes"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return enfermedades;
        }

        function getRelacionesSociales()
        {
            var relaciones = {
                items:[
                    {text:"Pérdida de amistades",subModel:"PerdidaAmistades"},
                    {text:"Rechazo de vecinos y otros grupos sociales",subModel:"Rechazo"},
                    {text:"Aislamiento personal",subModel:"Aislamiento"},
                    {text:"Rechazo laboral",subModel:"Rechazo"},
                    {text:"Identificación con otros grupos sociales",subModel:"IdentificacionOtrosGrupos"},
                    {text:"Otra",subModel:"Otro",hasOther:"Otro",showWhenValue:1}
                ],
                options:[{name:"Si", value:1},{name:"No", value:2},{name:"No se", value:99}]
            }
            return relaciones;
        }


    }
})();
