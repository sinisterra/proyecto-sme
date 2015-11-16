/**
 * Created by lockonDaniel on 11/7/15.
 */

(function() {
    'use strict';

    angular
        .module('appSme')
        .directive('questionsCheckBox',checkBoxQuestion);

    /* @ngInject */

    function checkBoxQuestion()
    {
        var directive =
        {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                options: '=',
            },
            templateUrl:'app/directives/checkBox.html',
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
        vm.model            = {values:[]};
        vm.conflicts        =[];



        angular.forEach(vm.options,function(value,key){
            vm.model.values.push(false);
            if(value.hasConflict!=undefined)
            {

                this.push(1);
            }
            else
            {
                this.push(0);
            }

            if(value.hasOther!=undefined){
                vm.model.others = [];
            }


        },vm.conflicts);

        vm.scope.$watchCollection('vm.model.values',watchFunction);


        function watchFunction(newValue,oldValue)
        {
            angular.forEach(vm.options,function(value,key){
                if(this[key]==1 && vm.model.values[key]==true)
                {

                    var temp =vm.model.others[key];
                    angular.forEach(vm.model.values,function(value,key){
                        vm.model.values[key]=false;
                        vm.model.others[key]=null;
                    })
                    vm.model.values[key]=true;
                    vm.model.others[key] = temp;
                }
            },vm.conflicts);
            $scope.ngModel = vm.model;

        }



    }



})();
