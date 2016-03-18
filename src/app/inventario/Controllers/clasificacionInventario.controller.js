/**
 * Created by lockonDaniel on 3/17/16.
 */
(function () {
    'use strict';

    angular.module('appSme').controller('ClasificacionInventarioController',ClasificacionInventarioController);

    function ClasificacionInventarioController($mdEditDialog,$mdDialog)
    {
        var vm = this;

        /*Variables*/

        vm.selectedTipoClasificador              = null;
        vm.tipoClasificadores                    = null;
        vm.clasificadores                        = null;
        vm.query                                 = {
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.toggleSearch                          = false;
        vm.clasificadorSearchName                = null;


        /*Funciones*/
        vm.getTipoClasificadores                 = getTipoClasificadores;
        vm.saveTipoClasificador                  = saveTipoClasificador;
        vm.getClasificadores                     = getClasificadores;
        vm.searchClasificador                    = searchClasificador;
        vm.activate                              = activate();
        /*Funciones para Editar Dialogos*/

        vm.editInfo                              = editInfo;
        vm.deleteElement                         = deleteElement;
        vm.addElement                            = addElement;


        function activate()
        {
            getTipoClasificadores();
        }

        function getTipoClasificadores()
        {
            console.log('Obteniendo tipos de Clasificador');
            vm.tipoClasificadores = [
                {id:1,Nombre:'Terrenos',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:2,Nombre:'Mobiliario',Descripcion:'Activo Fijo de Tipo Mobiliario'}
            ];
        }
        function saveTipoClasificador()
        {
            console.log('Grabando tipo de Clasificador');
        }

        function getClasificadores()
        {
            vm.clasificadores = [
                {id:1,Nombre:'Sillones',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:2,Nombre:'Escritorios',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:3,Nombre:'Computadoras',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:4,Nombre:'Gabinetes',Descripcion:'Activo Fijo de Tipo Terreno'}
            ];
        }

        function editInfo(event,clasificador,modelValue)
        {
            event.stopPropagation();
            vm.modelValue = modelValue;

            var config ={
                modelValue:clasificador[vm.modelValue],
                placeholder: 'Nombre del Clasificador',
                save: function(input,modelValue){
                    console.log(vm.modelValue);
                    clasificador[vm.modelValue]= input.$modelValue;
                    console.log(clasificador);
                },
                targetEvent: event,
                validators:{'md-maxlength':100}
            };

            var promise = $mdEditDialog.small(config);

            promise.then(function(res){

            });
        }

        function searchClasificador()
        {
            console.log(vm.clasificadorSearchName);
        }

        function deleteElement(ev,element,type)
        {

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('¿Deseas eliminar este elemento?')
                    .textContent('El elemento se eliminará de manera permanente')
                    .ariaLabel('delete-dialog')
                    .targetEvent(ev)
                    .ok('Acepto')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    if(type=='Clasificador')
                    {
                        console.log('Eliminado Clasificador');
                    }
                    if(type=='TipoClasificador')
                    {
                        console.log('Eliminado Tipo Clasificador');
                    }

                }, function() {
                    console.log('Cancelado' + element);
                });
        }

        function addElement(ev)
        {
            $mdDialog.show({
                    templateUrl: 'app/inventario/Views/dialogAddClasificador.tmpl.html',
                    controller: 'dialogAddClasificadorController',
                    controllerAs: 'vm',
                    bindToController:true,
                    locals: {selectedTipoClasificador:vm.selectedTipoClasificador},
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false
                })
                .then(function(answer) {
                   console.log(answer);
                }, function() {
                   console.log('Rechazado');
                });
        }



    }

})();