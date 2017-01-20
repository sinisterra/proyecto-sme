/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').controller('InventarioController',InventarioController);

    function InventarioController($mdDialog,Clasificador,Inventario,Ubicacion,toastr)
    {

        var vm = this;

        /*Variables*/

        vm.ubicaciones                           = null;
        vm.tipoClasificadores                    = null;
        vm.selectedTipoClasificador              = null;
        vm.clasificadores                        = null;
        vm.inventario                            = null;
        vm.savedInventario                       = null;
        vm.selectedClasificador                  = null;
        vm.toggleSearch                          = false;
        vm.inventarioSearchName                  = null;

        vm.loadingTipoClasificador               = false;
        vm.loadingClasificador                   = false;

        /*Mensajes*/
        vm.successStoreMessage                   = 'Éxito al guardar';
        vm.successDeleteMessage                  = 'Éxito al eliminar';
        vm.successMessage                        = 'Éxito';
        vm.failureStoreMessage                   = 'Error al guardar';
        vm.failureMessage                        = 'Error';
        vm.failureDeleteMessage                  = 'Error al eliminar';

        /*Funciones*/
        vm.getTipoClasificadores                 = getTipoClasificadores;
        vm.getClasificadores                     = getClasificadores;
        vm.getInventario                         = getInventario;
        vm.getUbicaciones                        = getUbicaciones;
        vm.searchInventario                      = searchInventario;
        vm.addElement                            = addElement;
        vm.deleteElement                         = deleteElement;
        vm.activate                              = activate();



        function activate()
        {
            getTipoClasificadores();
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


        function getTipoClasificadores()
        {
            vm.loadingTipoClasificador = true;
            Clasificador.getClasificadores().then(function(res){
               vm.tipoClasificadores = res;
               vm.loadingTipoClasificador = false;
            }).catch(function(err){

            });


        }

        function getClasificadores()
        {
            vm.clasificadores = null;
            vm.selectedClasificador = null;
            vm.loadingClasificador = true;
            Clasificador.getClasificadoresEspecificos(vm.selectedTipoClasificador.id).then(function(res){
                vm.clasificadores= res;
                vm.loadingClasificador = false;
            }).catch(function(err){

            });
        }

        function getInventario()
        {
            Inventario.byClasificadorEspecifico(vm.selectedClasificador.id).then(function(res){
               vm.inventario = res;
               vm.savedInventario = res;
            }).catch(function (err) {

            });

        }
        function searchInventario()
        {
            if(vm.inventarioSearchName!="")
            {
                vm.inventario = _.filter(vm.savedInventario,function(element){
                    var marcaFound = element.Marca.indexOf(vm.inventarioSearchName);
                    var modeloFound = element.Modelo.indexOf(vm.inventarioSearchName);
                    var descripcionFound = element.Descripcion.indexOf(vm.inventarioSearchName);
                    if(marcaFound!=-1 || modeloFound!=-1 || descripcionFound!=-1)
                        return true;
                    return false;

                });
            }
            else
            {
                vm.inventario = vm.savedInventario;
            }
        }

        function addElement(ev,element)
        {
            $mdDialog.show({
                    templateUrl: 'app/inventario/Views/dialogAddInventario.tmpl.html',
                    controller: 'dialogAddInventarioController',
                    controllerAs: 'vm',
                    bindToController:true,
                    locals: {element:element,idClasificadorEspecifico:vm.selectedClasificador.id},
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: false
                })
                .then(function(answer) {
                    Inventario.addInventario(answer).then(function(res){
                        toastr.success(vm.successStoreMessage,vm.successMessage);
                        getInventario();
                    }).catch(function (err) {
                        toastr.error(vm.failureStoreMessage,vm.failureMessage);
                    })

                }, function() {
                    console.log('Rechazado');
                });
        }

        function deleteElement(ev,element)
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
                    console.log('Inventario');
                Inventario.deleteInventario(element.id).then(function(res){
                    toastr.success(vm.successDeleteMessage,vm.successMessage);
                    getInventario();
                }).catch(function(err){
                    toastr.error(vm.failureDeleteMessage,vm.failureMessage);
                });

            }, function() {
                console.log('Cancelado' + element);
            });
        }


    }

})();