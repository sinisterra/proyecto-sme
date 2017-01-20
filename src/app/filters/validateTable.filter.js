/**
 * Created by lockonDaniel on 1/10/16.
 */
angular.module('appSme').filter('validateTable', function() {
    return function(input) {
        if(input!=null)
        {
           return "Si";
        }
        return "No";
    };
});