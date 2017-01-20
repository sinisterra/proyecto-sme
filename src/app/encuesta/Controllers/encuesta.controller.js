(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('EncuestaController', EncuestaController);

    /* @ngInject */
    function EncuestaController($state,Restangular, toastr, _) {
        var vm    = this;
        vm.nivel  = null;
        activate();
        function activate()
        {
            Restangular.all('Cuestionario').customGET().then(function(res){
                localStorage.setItem('nivel',res.nivel);
                vm.nivel = localStorage.nivel;
                switch (vm.nivel)
                {
                    case '0':
                        $state.go('trabajo');
                        break;
                    case '1':
                        $state.go('consecuencias');
                        break;
                    case '2':
                        $state.go('condiciones');
                        break;
                    case '3':
                        $state.go('proyectos');
                        break;
                    case '4':
                        $state.go('socioeconomico');
                        break;
                }

            }).catch(function(err){
                toastr.error('Error al procesar encuesta('+err.status+')');
                vm.nivel=5;
            });
        }


    }
})();
