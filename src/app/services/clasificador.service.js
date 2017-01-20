/**
 * Created by lockonDaniel on 4/19/16.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .factory('Clasificador', Clasificador);

    /* @ngInject */
    function Clasificador($q, Restangular, $state, localStorage) {
        var service = {
            getClasificadores:getClasificadores,
            addClasificador:addClasificador,
            updateClasificador:updateClasificador,
            deleteClasificador:deleteClasificador,
            getClasificadoresEspecificos:getClasificadoresEspecificos,
            deleteClasificadorEspecifico:deleteClasificadorEspecifico,
            addClasificadorEspecifico:addClasificadorEspecifico,
            updateClasificadorEspecifico:updateClasificadorEspecifico


        };
        return service;

        ////////////////

        function getClasificadores()
        {
            var deferred = $q.defer();
            Restangular.all('Clasificador').customGET().then(function(res){
               deferred.resolve(res.Clasificador);
            }).catch(function(err){
               deferred.reject(false);
            });
            return deferred.promise;
        }

        function addClasificador(clasificador)
        {
            var deferred = $q.defer();
            Restangular.all('Clasificador').customPOST(clasificador).then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function updateClasificador(id,clasificador)
        {
            var deferred = $q.defer();
            Restangular.one('Clasificador',id).customPUT(clasificador).then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function deleteClasificador(id)
        {
            var deferred = $q.defer();
            Restangular.one('Clasificador',id).customDELETE().then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }


        function getClasificadoresEspecificos(idClasificador)
        {
            var deferred = $q.defer();
            Restangular.all('Clasificador').one('Especifico',idClasificador).customGET().then(function(res){
                deferred.resolve(res.ClasificadorEspecifico);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function deleteClasificadorEspecifico(id)
        {
            var deferred = $q.defer();
            Restangular.one('ClasificadorEspecifico',id).customDELETE().then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function addClasificadorEspecifico(clasificador)
        {
            var deferred = $q.defer();
            Restangular.all('ClasificadorEspecifico').customPOST(clasificador).then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise
        }

        function updateClasificadorEspecifico(id,clasificador)
        {
            var deferred = $q.defer();
            Restangular.one('ClasificadorEspecifico',id).customPUT(clasificador).then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(false);
            });
            return deferred.promise;
        }


    }
})();
