/**
 * Created by lockonDaniel on 3/17/16.
 */
(function () {
    'use strict';

    angular.module('appSme').controller('ClasificacionInventarioController',ClasificacionInventarioController);

    function ClasificacionInventarioController($mdEditDialog,$mdDialog,Clasificador,toastr)
    {
        var vm = this;
        /*Variables*/

        vm.loadingTipoClasificador               = false;

        vm.selectedTipoClasificador              = null;
        vm.tipoClasificadores                    = null;
        vm.clasificadores                        = null;
        vm.savedClasificadores                   = null;
        vm.query                                 = {
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.toggleSearch                          = false;
        vm.clasificadorSearchName                = null;

        /*Variables*/
        vm.successStoreMessage                   = 'Éxito al guardar';
        vm.successDeleteMessage                  = 'Éxito al eliminar';
        vm.successMessage                        = 'Éxito';
        vm.failureStoreMessage                   = 'Error al guardar';
        vm.failureMessage                        = 'Error';
        vm.failureDeleteMessage                  = 'Error al eliminar';

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
            vm.loadingTipoClasificador = true;
            Clasificador.getClasificadores().then(function (res) {
               vm.loadingTipoClasificador = false;
               vm.tipoClasificadores = res;

            }).catch(function (err) {
                vm.loadingTipoClasificador = false;
            });

        }
        function saveTipoClasificador()
        {
            if(vm.selectedTipoClasificador.id!=null && vm.selectedTipoClasificador.id!=undefined)
            {
                Clasificador.updateClasificador(vm.selectedTipoClasificador.id,vm.selectedTipoClasificador)
                    .then(function(res){
                        vm.selectedTipoClasificador = res;
                        toastr.success(vm.successStoreMessage,vm.successMessage);
                        getTipoClasificadores();
                    }).catch(function (err) {
                        toastr.error(vm.failureStoreMessage,vm.failureMessage);

                })
            }
            else
            {
                Clasificador.addClasificador(vm.selectedTipoClasificador)
                    .then(function(res){
                        vm.searchClasificador = res;
                        getTipoClasificadores();
                        toastr.success(vm.successStoreMessage,vm.successMessage);
                    }).catch(function (err) {
                        toastr.error(vm.failureStoreMessage,vm.failureMessage);
                })
            }

        }

        function getClasificadores()
        {
            Clasificador.getClasificadoresEspecificos(vm.selectedTipoClasificador.id)
                .then(function(res){
                    vm.clasificadores = res;
                    vm.savedClasificadores = _.clone(vm.clasificadores);

                }).catch(function(err){

            });

        }

        function editInfo(event,clasificador,modelValue)
        {
            event.stopPropagation();
            vm.modelValue = modelValue;

            var config ={
                modelValue:clasificador[vm.modelValue],
                placeholder: 'Nombre del Clasificador',
                save: function(input,modelValue){
                    clasificador[vm.modelValue]= input.$modelValue;
                    Clasificador.updateClasificadorEspecifico(clasificador.id,clasificador).then(function(res){
                        toastr.success(vm.successStoreMessage,vm.successMessage);
                    }).catch(function(err){
                        toastr.error(vm.failureStoreMessage,vm.failureMessage);
                        getClasificadores();
                    });


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
            if(vm.clasificadorSearchName!="")
            {
                vm.clasificadores = _.filter(vm.savedClasificadores,function(element){
                    return element.Nombre.indexOf(vm.clasificadorSearchName) !=-1
                });
            }
            else
            {
                vm.clasificadores = vm.savedClasificadores;
            }


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
                        Clasificador.deleteClasificadorEspecifico(element.id).then(function(res){
                            getClasificadores();
                            toastr.success(vm.successDeleteMessage,vm.successMessage);
                        }).catch(function(err){
                            toastr.error(vm.failureDeleteMessage,vm.failureMessage);
                        });
                    }
                    if(type=='TipoClasificador')
                    {
                        Clasificador.deleteClasificador(element.id).then(function(res){
                            vm.selectedTipoClasificador = null;
                            toastr.success(vm.successDeleteMessage,vm.successMessage);
                            getTipoClasificadores();
                        }).catch(function(err){
                            toastr.error(vm.failureDeleteMessage,vm.failureMessage);
                        });

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
                    answer.idClasificador = vm.selectedTipoClasificador.id;
                    Clasificador.addClasificadorEspecifico(answer).then(function(res){
                        toastr.success(vm.successStoreMessage,vm.successMessage);
                        getClasificadores();
                    }).catch(function(err){
                        toastr.error(vm.failureStoreMessage,vm.failureMessage);
                    });

                }, function() {
                   console.log('Rechazado');
                });
        }



    }

})();