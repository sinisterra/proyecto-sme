/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use striect';

    angular.module('appSme').config(encuestaConfig);

    function encuestaConfig($stateProvider)
    {
        $stateProvider.state('encuesta',{
                parent:'base',
                url:'/encuesta',
                templateUrl:'app/encuesta/Views/encuesta.html',
                controller: 'EncuestaController',
                controllerAs: 'encuesta',
                data:{
                    requireLogin:true,
                    displayName:'Censo del SME'
                }
            })
            .state('reset',{
                parent:'base',
                url:'/resetEncuesta',
                templateUrl:'app/encuesta/Views/reset.html',
                controller: 'ResetEncuestaController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Reiniciar Censo'
                }
            })
            .state('trabajo',{
                parent:'encuesta',
                url:'/trabajo',
                templateUrl:'app/encuesta/Views/trabajo.html',
                controller: 'TrabajoController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Censo: Información Laboral'
                }
            })
            .state('consecuencias',{
                parent:'encuesta',
                url:'/consecuencias',
                templateUrl:'app/encuesta/Views/consecuencias.html',
                controller: 'ConsecuenciasController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Censo: Consecuencias'
                }
            })
            .state('condiciones',{
                parent:'encuesta',
                url:'/condiciones',
                templateUrl:'app/encuesta/Views/condicionesRegreso.html',
                controller: 'CondicionesRegresoController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Censo: Condiciones de Regreso'
                }
            })
            .state('proyectos',{
                parent:'encuesta',
                url:'/proyectos',
                templateUrl:'app/encuesta/Views/proyectos.html',
                controller: 'ProyectosController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Censo: Proyectos dentro del SME'
                }
            })
            .state('socioeconomico',{
                parent:'encuesta',
                url:'/socioeconomico',
                templateUrl:'app/encuesta/Views/socioeconomico.html',
                controller: 'SocioeconomicoController',
                controllerAs: 'vm',
                data:{
                    requireLogin:true,
                    displayName:'Censo: Estudio Socioeconómico'
                }
            });
    }

})();