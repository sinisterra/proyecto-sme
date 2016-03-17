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
          requireLogin: true
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
        data: {
          requireLogin: true,
          displayName: 'Menú de Inicio'
        }
      });



    $urlRouterProvider.otherwise('/');
  }

})();
