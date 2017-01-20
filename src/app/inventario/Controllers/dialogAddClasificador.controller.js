/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').controller('dialogAddClasificadorController',dialogAddClasificadorController);

    function dialogAddClasificadorController($mdDialog)
    {
        var vm = this;

        /*Variables*/
        vm.clasificador                  = null;

        /*Funciones*/

        vm.cancel                        = cancel;
        vm.answer                        = answer;

        //console.log(vm.selectedTipoClasificador.id);

        function cancel()
        {
            $mdDialog.cancel();
        }


        function answer()
        {
            vm.clasificador.idTipoClasificador = vm.selectedTipoClasificador.id;
            $mdDialog.hide(vm.clasificador);
        }


    }

})();