/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').config(adminConfig);

    function adminConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('base.stats', {
                url: '/stats',
                templateUrl: 'app/admin/Views/stats.html',
                controller: 'StatsController',
                controllerAs: 'stats',
                data:{
                    requireAdmin:true,
                    displayName: 'Estadísticas'
                }
            })
            .state('base.admin', {
                url: '/admin',
                templateUrl: 'app/admin/Views/admin.html',
                controller: 'AdminController',
                controllerAs: 'admin',
                data:{
                    requireAdmin:true,
                    displayName: 'Funciones de Administrador'
                }
            });
    }


})();