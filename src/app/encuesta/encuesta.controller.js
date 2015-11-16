(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('EncuestaController', EncuestaController);

    /* @ngInject */
    function EncuestaController($rootScope,Restangular, toastr, _) {
        var vm    = this;
        vm.nivel  = null;
        activate();

        $rootScope.$on('rootScope:emit', function (event, data) {
            vm.nivel = localStorage.getItem('nivel');
            console.log(vm.nivel);
        });

        function activate()
        {
            Restangular.all('Cuestionario').customGET().then(function(res){
                localStorage.setItem('nivel',res.nivel);
                vm.nivel = localStorage;
                console.log(vm.nivel);
            }).catch(function(err){
                toastr.error('Error al procesar encuesta('+err.status+')');
            });
        }


    }
})();
