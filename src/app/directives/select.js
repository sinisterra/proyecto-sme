/**
 * Created by lockonDaniel on 11/14/15.
 */
/**
 * Created by lockonDaniel on 11/14/15.
 */
/**
 * Created by lockonDaniel on 11/7/15.
 */

(function() {
    'use strict';

    angular
        .module('appSme')
        .directive('questionsSelect',selectQuestion);

    /* @ngInject */

    function selectQuestion()
    {
        var directive =
        {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                options:'=',
                idPregunta: '@',
                label:'@'
            },
            templateUrl:'app/directives/select.html',
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
        vm.label = $scope.label;
        vm.scope = $scope;
        vm.scope.ngModel.push({idPregunta:vm.scope.idPregunta,value:null});
        vm.options          = vm.scope.options;
        vm.model            = vm.scope.ngModel[vm.scope.ngModel.length-1];
        vm.selectedOption   = null;


        vm.scope.$watch('vm.model.value',watchFunction);





        function watchFunction()
        {
            vm.selectedOption= vm.options.find(findByValue);
        }

        function findByValue(option)
        {
            return option.value === vm.model.value;
        }



    }
})();
