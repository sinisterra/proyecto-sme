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
        vm.align            = $scope.align;
        vm.model            = {};
        vm.hasOtherModel    = null;
        vm.showWhenValue    = null;
        vm.hasOtherText     = null
        vm.subModels        = [];
        vm.conflictingModel = null;
        vm.conflictingValue = null;

        vm.scope.$watch('vm.model',watchFunction,true);

        angular.forEach($scope.items,function(value,key){
            if(value.hasOther!=undefined)
            {
                vm.hasOtherModel = value.subModel;
                vm.showWhenValue = value.showWhenValue;
                vm.hasOtherText  = value.hasOther;
            }
            if(value.hasConflict==undefined)
            {
                vm.subModels.push(value.subModel);
            }
            else{
                vm.conflictingModel = value.subModel;
                vm.conflictingValue = value.conflictValue;
                vm.setAllValue      = value.setAllValue;
            }

        });




        function watchFunction(newValue,oldValue)
        {
            $scope.ngModel = vm.model;
            if(vm.hasOtherModel!=null)
            {
                if(vm.model[vm.hasOtherModel]!=undefined)
                {
                    if(vm.model[vm.hasOtherModel].value!=vm.showWhenValue)
                    {
                        vm.model[vm.hasOtherModel].Otro="";
                    }
                }
                if(vm.model[vm.conflictingModel]!=undefined && vm.model[vm.conflictingModel].value==vm.conflictingValue)
                {
                    angular.forEach(vm.subModels,function(value,key)
                    {
                        vm.model[value].value = vm.setAllValue;
                    })
                }
            }

        }



    }



})();
