(function() {
  'use strict';

  angular
    .module('appSme')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('base', {
        abstract: true,
        templateUrl: 'app/base/base.html',
        data: {
          requireLogin: true,
        }
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home',
        data: {
          requireLogin: false
        }
      })
      .state('logout',{
        controller: 'LogoutController',
        data:{
          requireLogin: false
        }
      })
      .state('dashboard',{
        parent: 'base',
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
      })
      .state('stats', {
        parent: 'base',
        url: '/stats',
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsController',
        controllerAs: 'stats'
      })

      // .state('info',{
      //   url: '/info',
      //   // abstract: true,
      //   parent: 'base',
      // })
      .state('infoPersonal',{
        parent: 'base',
        url:'/info/personal',
        templateUrl: 'app/info/layout.html',
        controller: 'InfoPersonalController',
        controllerAs: 'vm'
      })
      .state('encuesta',{
        parent:'base',
        url:'/encuesta',
        templateUrl:'app/encuesta/encuesta.html',
        controller: 'EncuestaController',
        controllerAs: 'encuesta',
      })
      .state('trabajo',{
        parent:'encuesta',
        url:'/trabajo',
        templateUrl:'app/encuesta/trabajo.html',
        controller: 'TrabajoController',
        controllerAs: 'vm'
      })
      .state('consecuencias',{
        parent:'encuesta',
        url:'/consecuencias',
        templateUrl:'app/encuesta/consecuencias.html',
        controller: 'ConsecuenciasController',
        controllerAs: 'vm'
      })
      .state('condiciones',{
        parent:'encuesta',
        url:'/condiciones',
        templateUrl:'app/encuesta/condicionesRegreso.html',
        controller: 'CondicionesRegresoController',
        controllerAs: 'vm'
      })
      .state('proyectos',{
        parent:'encuesta',
        url:'/proyectos',
        templateUrl:'app/encuesta/proyectos.html',
        controller: 'ProyectosController',
        controllerAs: 'vm'
      })
      .state('socioeconomico',{
        parent:'encuesta',
        url:'/socioeconomico',
        templateUrl:'app/encuesta/socioeconomico.html',
        controller: 'SocioeconomicoController',
        controllerAs: 'vm'
      })
    ;



    $urlRouterProvider.otherwise('/');
  }

})();
