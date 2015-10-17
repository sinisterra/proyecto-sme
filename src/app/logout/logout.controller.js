(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['User', '$state'];

    /* @ngInject */
    function LogoutController(User, $state) {
        var vm = this;
        vm.title = 'LogoutController';

        activate();

        ////////////////

        function activate() {
            localStorage.clear();
            // localStorage.isLoggedIn = false;
            // User.isLoggedIn = false;
            $state.go('home');
        }
    }
})();
