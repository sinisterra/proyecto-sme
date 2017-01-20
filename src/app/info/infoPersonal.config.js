/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').config(infoPersonalConfig);

    function infoPersonalConfig($stateProvider)
    {
        $stateProvider.state('infoPersonal',{
        parent: 'base',
        url:'/info/personal',
        templateUrl: 'app/info/Views/layout.html',
        controller: 'InfoPersonalController',
        controllerAs: 'vm',
        data:{
            requireLogin:true,
            displayName:'Información Personal'
        }
    })
    }

})();