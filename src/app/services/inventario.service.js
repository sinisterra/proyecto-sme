/**
 * Created by lockonDaniel on 4/19/16.
 */
/**
 * Created by lockonDaniel on 4/19/16.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .factory('Inventario', Inventario);

    /* @ngInject */
    function Inventario($q, Restangular) {
        var service = {
            byClasificadorEspecifico:byClasificadorEspecifico,
            addInventario:addInventario,
            deleteInventario:deleteInventario
        };
        return service;

        ////////////////

        function byClasificadorEspecifico(id)
        {
            var deferred = $q.defer();
            Restangular.all('Inventario').one('ClasificadorEspecifico',id).customGET().then(function(res){
                var Inventario =_.map(res.Inventario,function(element,key){
                    element.FechaDeAdquisicion = moment(element.FechaDeAdquisicion).toDate();
                    return element
                });


                deferred.resolve(Inventario);
            }).catch(function (err) {
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function addInventario(inventario)
        {
            var deferred = $q.defer();
            if(inventario.id!=undefined && inventario.id!=null)
            {
                Restangular.one('Inventario',inventario.id).customPUT(inventario).then(function(res){
                    deferred.resolve(res.Inventario);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            else
            {
                Restangular.all('Inventario').customPOST(inventario).then(function(res){
                    deferred.resolve(res.Inventario);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function deleteInventario(id)
        {
            var deferred = $q.defer();

                Restangular.one('Inventario',id).customDELETE().then(function(res){
                    deferred.resolve(res.Inventario);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            return deferred.promise;
        }



    }
})();
