/**
 * Created by lockonDaniel on 11/10/16.
 */

angular
    .module('appSme')
    .controller('RegistroSocioController',RegistroSocioController);

function RegistroSocioController(AdminService,LibroSociosService, $q, toastr, $mdDialog) {
    var vm = this;

    //Variables

    vm.selectedItem          = null;
    vm.searchText            = null;
    vm.users                 = null;
    vm.certificateId         = null;
    vm.certificates          = [];
    vm.query                 = {
        order: 'id',
        limit: 5,
        page: 1
    };
    vm.label                 = {'page': 'Página:', 'rowsPerPage': 'Filas por página:', 'of': 'de'};

    /*Mensajes*/
    vm.successStoreMessage                   = 'Éxito al guardar';
    vm.successDeleteMessage                  = 'Éxito al eliminar';
    vm.successMessage                        = 'Éxito';
    vm.failureStoreMessage                   = 'Error al guardar';
    vm.failureMessage                        = 'Error';
    vm.failureDeleteMessage                  = 'Error al eliminar';


    // Funciones
    vm.querySearch           = querySearch;
    vm.selectedItemChange    = selectedItemChange;
    vm.addCertificate        = addCertificate;
    vm.deleteElement     = deleteElement;



    function querySearch() {
        return AdminService.getUsers(vm.searchText).then(function(res){
            return res.Users;
        }).catch(function(err){
            return null;
        });
    }

    // Buscamos los certificados del cliente
    function selectedItemChange(item)
    {
        LibroSociosService.getCertificates(item).then(function(res){
            vm.certificates = res;
        }).catch(function(err){
            vm.certificates = null;
        });
    }

    // Se construye el certificado con vm.selectedItem como base y luego se envía al servicio
    function addCertificate() {
        var builtCertificate = {
            'idUsuario':vm.selectedItem.idUsuario,
            'idCertificado':vm.certificateId
        };

        var promises = {
            'create':LibroSociosService.create(builtCertificate),
            'refresh_items':LibroSociosService.getCertificates(vm.selectedItem)
        };

        $q.all(promises).then(function(results){
            vm.certificates = results.refresh_items;
            toastr.success(vm.successStoreMessage,vm.successMessage);
        }).catch(function(err){
            toastr.error(vm.failureStoreMessage,vm.failureMessage);

        });
    }

    //Eliminamos el certificado
    function deleteElement(ev,element) {
        var confirm = $mdDialog.confirm()
            .title('¿Deseas eliminar este elemento?')
            .textContent('El elemento se eliminará de manera permanente')
            .ariaLabel('delete-dialog')
            .targetEvent(ev)
            .ok('Acepto')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function() {
            LibroSociosService.destroy(element).then(function(res){
                toastr.success(vm.successDeleteMessage,vm.successMessage);
                selectedItemChange(vm.selectedItem);
            }).catch(function(err){
                toastr.error(vm.failureDeleteMessage,vm.failureMessage);
            });

        }, function() {
        });
    }

}