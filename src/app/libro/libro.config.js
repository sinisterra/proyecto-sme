/**
 * Created by lockonDaniel on 11/10/16.
 */
'use strict';

angular
    .module('appSme')
    .config(config);

function config($stateProvider) {

    $stateProvider
        .state('base.libro', {
            url: '/libro_socio',
            templateUrl: 'app/libro/Views/registro_socio.html',
            controller: 'RegistroSocioController',
            controllerAs: 'vm',
            data:{
                requireAdmin:true,
                displayName: 'Registro de Socio'
            }
        });

}