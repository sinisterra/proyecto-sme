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
        vm.getCarreras           = getCarreras;
        vm.searchCarrera         = searchCarrera;
        vm.selectedItemChange    = selectedItemChange;
        vm.lookupProgress        = true;
        vm.selectedItem          = null;
        vm.searchText            = null;
        vm.users                 = null;
        vm.searchRegister        = null;
        vm.registros             = null;
        vm.registrosCarrera      = null;
        vm.countCarreras         = 0;
        vm.count                 = 0;

        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };
        vm.queryCarreras = {
            order: 'id',
            limit: 5,
            page: 1
        };

        vm.niveles              = [
            {value:5,label:'Medio Superior'},{value:6,label:'Superior'},{value:7,label:'Posgrado'}
        ];
        vm.selectedNivel        = null;
        vm.carreras             = null;


        function activate() {
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
            vm.promise = Restangular.all('Estadisticas').one('RegistroDatos',vm.searchRegister).customGET();
            vm.promise.then(function(res){
                vm.registros = res.Registros;
                vm.count = vm.registros.length;
            }).catch(function(err){});
        }

        function getCarreras()
        {
            vm.lookupProgress =false;
            Restangular.all('Carrera').one('Nivel',vm.selectedNivel).customGET().then(function(res){
                vm.carreras=res.Carrera;
                vm.lookupProgress = true;
            }).catch(function(err){});
        }

        function searchCarrera (query) {
            var results = query ? vm.carreras.filter(createFilterFor(query)) : self.carreras;
            return results;

        }

        function createFilterFor(query)
        {
            var upperCaseQuery = angular.uppercase(query);
            return function filterFn(carrera){
                return (carrera.NombreCarrera.indexOf(upperCaseQuery)===0);
            }
        }

        function selectedItemChange()
        {
            console.log(vm.selectedCarrera);
            if(vm.selectedCarrera!=null)
            {
                vm.promiseCarrera =Restangular.all('Admin').one('Carrera',vm.selectedCarrera.id).customGET();
                vm.promiseCarrera.then(function(res){
                    vm.registrosCarrera =res.Registros;
                    vm.countCarreras = vm.registrosCarrera.length;
                }).catch(function(err){});
            }else
            {
                vm.registrosCarrera=null;
                vm.countCarreras = 0;
            }

        }



    }
})();
