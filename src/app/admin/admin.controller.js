/**
 * Created by lockonDaniel on 12/2/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('AdminController', AdminController);

    /* @ngInject */
    function AdminController($state, User, $mdSidenav, Restangular,toastr, Auth) {
        var vm = this;

        vm.$state = $state;
        vm.user = User;
        vm.close = close;

        function close() {
            $mdSidenav('left').toggle();
        }
        function activate() {


            if (!localStorage.getItem('type')) {
                Restangular.all('authenticate').customGET().then(function(res) {
                    localStorage['type'] = res.user.tipo;
                    vm.isUser = localStorage['type'] === 'User' ? true : false;
                });
            }


        }
        function checkAuth() {
            return localStorage.type === 'Admin';
        }
        activate();
        if(!checkAuth())
        {
            $state.go('dashboard');
        }


        vm.querySearch =    querySearch;
        vm.selectedItem =   null;
        vm.searchText=      null;
        vm.users=           null;


        function querySearch(query)
        {
            return getUsers(query).then(function(res){
                console.log(res.Users);
                return res.Users;
            });



        }

        function getUsers(query)
        {

            return Restangular.all('Admin').all('User').all(query).customGET().then(function (res) {
               return res;

            }).catch(function(err){
                console.log(err);
                vm.users = null;
            });

        }




    }
})();
