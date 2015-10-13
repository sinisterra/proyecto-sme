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
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html'
      })
      .state('dashboard',{
        parent: 'base',
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
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
      });



    $urlRouterProvider.otherwise('/');
  }

})();
