(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('InfoPersonalController', InfoPersonalController);

    /* @ngInject */
    function InfoPersonalController() {
        var vm = this;
        vm.title = 'InfoPersonalController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();