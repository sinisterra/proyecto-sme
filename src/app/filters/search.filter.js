/**
 * Created by lockonDaniel on 4/19/16.
 */
angular.module('appSme').filter('search', function() {
    return function(input, array) {
        if(input!=null)
        {
            return _.findWhere(array,{id:input}).Nombre
        }
        return null;
    };
});