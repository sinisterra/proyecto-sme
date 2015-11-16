/**
 * Created by lockonDaniel on 11/8/15.
 */
/**
 * Created by lockonDaniel on 11/8/15.
 */
/**
 * Created by lockonDaniel on 11/7/15.
 */

(function() {
    'use strict';

    angular
        .module('appSme')
        .directive('questionsTable',tableQuestions);

    /* @ngInject */

    function tableQuestions()
    {
        var directive =
        {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                options: '=',
                items: '=',
                align:   '@'
            },
            templateUrl:'app/directives/table.html',
            controller: controller,
            controllerAs: 'vm',
            link: link
        };

        return directive;



    }

    function link()
    {

    }

    controller.$inject =['$scope'];
    function controller($scope)
    {
        var vm = this;
        vm.scope            = $scope;
        vm.options          = $scope.options;
        vm.items            = $scope.items;

        vm.itemsWhenCreated = null;
        vm.numItems         = vm.items.length;
        vm.align            = $scope.align;
        vm.model            = $scope.ngModel;
        vm.firstTime        = true;



        vm.scope.$watchCollection('vm.model',watchFunction);

        function watchFunction(newValues,oldValues)
        {
            if(vm.firstTime)
            {
                //console.log(vm.model);
                vm.itemsWhenCreated =  vm.model.length;
                vm.firstTime        =  false;
            }

        }
    }



})();