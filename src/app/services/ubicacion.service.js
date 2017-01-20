/**
 * Created by lockonDaniel on 4/19/16.
 */
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
        .factory('Ubicacion', Ubicacion);

    /* @ngInject */
    function Ubicacion($q, Restangular) {
        var service = {
            all:all

        };
        return service;

        ////////////////

        function all()
        {
            var deferred = $q.defer();
            Restangular.all('Ubicacion').customGET().then(function(res){
                deferred.resolve(res.Ubicacion);
            }).catch(function (err) {
                deferred.reject(false);
            });
            return deferred.promise;
        }



    }
})();
