(function() {
  'use strict';

  angular
      .module('appSme')
      .config(config);




  /** @ngInject */
  function config($logProvider, $httpProvider, toastr, $mdThemingProvider, RestangularProvider, $mdDateLocaleProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    $mdThemingProvider.theme('default')
      .primaryPalette('red', {
        'default': '800'
      })
      .accentPalette('amber')
      .warnPalette('deep-orange');

    //var api = "http://192.168.10.11/api";
    var api = 'http://sme.org.mx/ipnsme2015/luz_fuerza_laravel/public/api';
    RestangularProvider.setBaseUrl(api);

    $httpProvider.interceptors.push('AuthInterceptor');

    $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('L');
  };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'L', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };

  }

})();
