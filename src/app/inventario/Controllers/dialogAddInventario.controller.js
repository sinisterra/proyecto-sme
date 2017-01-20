/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').controller('dialogAddInventarioController',dialogAddInventarioController);

    function dialogAddInventarioController($mdDialog,Ubicacion)
    {
        var vm = this;

        /*Variables*/
        vm.ubicaciones                   = null;
        vm.estados                       = ['Obsoleto','Malas Condiciones','Aceptable','Bueno','Excelente','Nuevo'];
        /*Funciones*/

        vm.cancel                        = cancel;
        vm.answer                        = answer;
        vm.activate                      = activate();

        //console.log(vm.selectedTipoClasificador.id);

        function activate()
        {
            getUbicaciones();

        }

        function getUbicaciones()
        {
            Ubicacion.all().then(function (res) {
               vm.ubicaciones = res;
            }).catch(function (err) {

            });

            vm.ubicaciones = [
                {id:1,'Nombre':'Edificio Antonio Caso'},
                {id:2,'Nombre':'Otro Edificio'}
            ];
        }

        function cancel()
        {
            $mdDialog.cancel();
        }


        function answer()
        {

            vm.element.idClasificadorEspecifico= vm.idClasificadorEspecifico;
            $mdDialog.hide(vm.element);
        }


    }

})();