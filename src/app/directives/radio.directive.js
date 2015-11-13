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
                wrap: '@'
            },
            templateUrl:'app/directives/radio.html',
            controller: controller,
            link: link
        };

        return directive;



    }

    function link()
    {

    }


    controller.$inject =['$scope'];
    function controller()
    {
        var vm = this;
        vm.scope            = $scope;
        vm.options          = $scope.options;
        vm.align            = $scope.align;
        vm.wrap             = $scope.wrap;
        vm.model            = {value:null};


        vm.scope.$watch('vm.model',watchFunction,true);

        angular.forEach($scope.options,function(value,key){
           if(value.hasOther!=undefined)
           {
               vm.model.other=null;
           }
        });


        function watchFunction(newValue,oldValue)
        {
            $scope.ngModel = vm.model;
        }



    }



})();
