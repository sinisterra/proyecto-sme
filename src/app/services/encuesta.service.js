/**
 * Created by lockonDaniel on 11/15/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .factory('Encuesta', Encuesta);

    /* @ngInject */
    function Encuesta() {
        var schema =
        {
            getNivel: getNivel,
            setNivel: setNivel,
            nivel: localStorage.nivel || null
        };
        function getNivel()
        {
            return this.nivel;
        }
        function setNivel(newNivel)
        {
            localStorage.setItem('nivel',newNivel);
            this.nivel = newNivel;
        }
        return schema;

    }


})();
