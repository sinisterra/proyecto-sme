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
        .directive('questionsRadio',radioButtonQuestion);

    /* @ngInject */

    function radioButtonQuestion()
    {
        var directive =
        {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                options: '=',
                align:   '@',
                idPregunta: '@',
                default: '@',
                wrap: '@',
                arrayNumber:'='
            },
            templateUrl:'app/directives/radio.html',
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
        vm.align            = $scope.align;
        vm.wrap             = $scope.wrap;
        $scope.default==undefined ? vm.default = null : vm.default = $scope.default;


        $scope.ngModel.push({idPregunta:$scope.idPregunta,value:$scope.default});

        vm.scope.arrayNumber    = vm.scope.ngModel.length-1;
        vm.model                = $scope.ngModel[$scope.ngModel.length-1];
        vm.model.value          = vm.default;





        angular.forEach($scope.options,function(value,key){
           if(value.hasOther!=undefined)
           {
               vm.model.other=null;
           }
        });


        /*
        vm.scope.$watch('vm.model',watchFunction,true);

        function watchFunction(newValue,oldValue)
        {
            $scope.ngModel = vm.model;
        }*/



    }



})();
