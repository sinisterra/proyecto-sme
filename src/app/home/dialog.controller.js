/**
 * Created by lockonDaniel on 11/19/15.
 */
(function() {
    'use strict';

    angular
        .module('appSme')
        .controller('DialogController', DialogController);

    /* @ngInject */
    function DialogController(User, $mdDialog,$state, Restangular, Auth, toastr) {
        var vm=this;
        vm.link = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';

    }
})();
