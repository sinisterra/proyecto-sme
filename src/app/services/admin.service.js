/**
 * Created by lockonDaniel on 4/19/16.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .factory('AdminService', AdminService);

    /* @ngInject */
    function AdminService($q, Restangular, $state, localStorage) {
        var service = {
           getUsers:getUsers
        };
        return service;

        ////////////////

        function getUsers(query) {
            return Restangular.all('Admin').all('User').all(query).customGET();
        }
    }
})();
