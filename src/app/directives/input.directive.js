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
        .directive('questionsInput',checkBoxQuestion);

    /* @ngInject */

    function checkBoxQuestion()
    {
        var directive =
        {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                idPregunta: '@',
                label: '@',
                type:'@'
            },
            templateUrl:'app/directives/input.html',
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
        vm.scope = $scope;
        vm.scope.ngModel.push({idPregunta:vm.scope.idPregunta,value:null});

        vm.label = vm.scope.label;
        vm.model = vm.scope.ngModel[vm.scope.ngModel.length-1];



    }
})();
