/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').config(inventarioConfig);

    function inventarioConfig($stateProvider)
    {
        $stateProvider
            .state('base.clasificacionInventario', {
                url: '/clasificacion_inventario',
                templateUrl: 'app/inventario/Views/clasificacion.html',
                controller: 'ClasificacionInventarioController',
                controllerAs: 'vm',
                data:{
                    requireAdmin:true,
                    displayName: 'Clasificación de Inventario'
                }
            }).state('base.inventario', {
                url: '/inventario',
                templateUrl: 'app/inventario/Views/inventario.html',
                controller: 'InventarioController',
                controllerAs: 'vm',
                data:{
                    requireAdmin:true,
                    displayName: 'Manejo de Inventario'
                }
            })
        ;
    }

})();