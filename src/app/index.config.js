(function() {
  'use strict';

  angular
    .module('appSme')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastr, $mdThemingProvider, RestangularProvider) {
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
      .warnPalette('pink');

    RestangularProvider.setBaseUrl('http://187.159.54.98:8888/luz_fuerza_laravel/public/api');

    $httpProvider.interceptors.push('AuthInterceptor');

  }

})();
