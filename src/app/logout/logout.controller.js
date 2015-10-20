(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('LogoutController', LogoutController);

    /* @ngInject */
    function LogoutController(Auth, $state) {
        var vm = this;
        vm.title = 'LogoutController';

        activate();

        ////////////////

        function activate() {
            Auth.logout();
            // localStorage.isLoggedIn = false;
            // User.isLoggedIn = false;
            $state.go('home');
        }
    }
})();
