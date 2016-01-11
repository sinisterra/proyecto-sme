/**
 * Created by lockonDaniel on 1/10/16.
 */
angular.module('appSme').filter('offset', function() {
    return function(input, start) {
        if(input!=null)
        {
            start = parseInt(start,10);
            return input.slice(start);
        }
        return null;
    };
});