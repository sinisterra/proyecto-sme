(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('ResetEncuestaController', ResetEncuestaController);

    /* @ngInject */
    function ResetEncuestaController($state,Restangular, toastr, _) {
        var vm    = this;
        vm.reset  = reset;

        function reset()
        {
            Restangular.all('Cuestionario').all('Reset').customGET().then(function(res)
            {
                toastr.success('La encuesta se ha reiniciado');
            }).catch(function(err)
            {
               toastr.error('Error al reiniciar la encuesta');
            });
        }



    }
})();
