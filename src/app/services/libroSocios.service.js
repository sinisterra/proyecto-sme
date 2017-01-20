/**
 * Created by lockonDaniel on 4/19/16.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .factory('LibroSociosService', LibroSociosService);

    /* @ngInject */
    function LibroSociosService(Restangular) {
        var service = {
            getCertificates:getCertificates,
            create:create,
            destroy:destroy
        };
        return service;

        ////////////////

        function getCertificates(user) {
            return Restangular.all('Certificado').one('Socio',user.idUsuario).customGET();
        }

        function create(certificate) {
            return Restangular.all('Certificado').all('Socio').post(certificate)
        }

        function destroy(certificate) {
            return Restangular.one('Certificado',certificate.id).customDELETE();
        }
    }
})();
