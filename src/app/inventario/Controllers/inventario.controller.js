/**
 * Created by lockonDaniel on 3/17/16.
 */
(function(){
    'use strict';

    angular.module('appSme').controller('InventarioController',InventarioController);

    function InventarioController($mdDialog)
    {

        var vm = this;

        /*Variables*/

        vm.tipoClasificadores                    = null;
        vm.selectedTipoClasificador              = null;
        vm.clasificadores                        = null;
        vm.inventario                            = null;
        vm.selectedClasificador                  = null;
        vm.toggleSearch                          = false;
        vm.inventarioSearchName                  = null;


        /*Funciones*/
        vm.getTipoClasificadores                 = getTipoClasificadores;
        vm.getClasificadores                     = getClasificadores;
        vm.getInventario                         = getInventario;
        vm.searchInventario                      = searchInventario;
        vm.addElement                            = addElement;
        vm.deleteElement                         = deleteElement;
        vm.activate                              = activate();



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

        function getClasificadores()
        {
            vm.clasificadores = [
                {id:1,Nombre:'Sillones',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:2,Nombre:'Escritorios',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:3,Nombre:'Computadoras',Descripcion:'Activo Fijo de Tipo Terreno'},
                {id:4,Nombre:'Gabinetes',Descripcion:'Activo Fijo de Tipo Terreno'}
            ];
        }

        function getInventario()
        {

            vm.inventario = [
                {id:1,Marca:'Sony',Modelo:'XLR123',Descripcion:'Cámara Digital 20MPX',Cantidad:20,
                idUbicacion:1,Estado:'Aceptable',Valor:1249000,FechaAdquisicion:'2010-10-01',Observaciones:'Sin Etiquedar'},
                {id:1,Marca:'Motorola',Modelo:'AR124',Descripcion:'Walkie Talkie',Cantidad:10,
                idUbicacion:2,Estado:'Excelente',Valor:30000,FechaAdquisicion:'2015-10-01',Observaciones:''}
            ];
            console.log(vm.inventario);
        }
        function searchInventario()
        {
            console.log('Funcion de Busqueda');
        }

        function addElement(ev,element)
        {
            $mdDialog.show({
                    templateUrl: 'app/inventario/Views/dialogAddInventario.tmpl.html',
                    controller: 'dialogAddInventarioController',
                    controllerAs: 'vm',
                    bindToController:true,
                    locals: {element:element},
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

            }, function() {
                console.log('Cancelado' + element);
            });
        }


    }

})();