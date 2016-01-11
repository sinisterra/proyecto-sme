/**
 * Created by lockonDaniel on 12/2/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController($state, User, Restangular) {
        var vm = this;
        activate();
        vm.user = User;
        /*
            Variables
         */
        vm.querySearch           = querySearch;
        vm.lookupRegisters       = lookupRegisters;
        vm.selectedItem          = null;
        vm.searchText            = null;
        vm.users                 = null;
        vm.searchRegister        = null;
        vm.registros             = null;

        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };


        function activate() {

            console.log('Activating');
            if (!localStorage.getItem('type')) {
                Restangular.all('authenticate').customGET().then(function(res) {
                    localStorage['type'] = res.user.tipo;
                    vm.isUser = localStorage['type'] === 'User' ? true : false;
                    if(vm.isUser)
                        $state.go('dashboard');
                });
            }


        }



        function querySearch(query)
        {
            return getUsers(query).then(function(res){
                return res.Users;
            });
        }

        function getUsers(query)
        {

            return Restangular.all('Admin').all('User').all(query).customGET().then(function (res) {
               return res;
            }).catch(function(err){
                vm.users = null;
            });
        }

        function lookupRegisters()
        {
            console.log('Buscando '+vm.searchRegister);
            Restangular.all('Estadisticas').one('RegistroDatos',vm.searchRegister).customGET().then(function(res){
                vm.registros = res.Registros;
                vm.count = vm.registros.length;
            }).catch(function(err){});
        }






    }
})();
