(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('InfoPersonalController', InfoPersonalController);

    /* @ngInject */
    function InfoPersonalController(Restangular) {
        var vm = this;
        vm.title = 'InfoPersonalController';

        vm.today = new Date();

        activate();

        vm.submitFormPersonal = submitFormPersonal;

        function submitFormPersonal(isValid) {

            if (isValid) {

                //proceder a enviar la forma

                debugger

                Restangular.all('DatosPersonales').getList().then(function(res){
                    debugger
                });

                toastr.success('La información ha sido guardada correctamente.', '¡Éxito!');

            }
        }

        ////////////////

        function activate() {}
    }
})();
