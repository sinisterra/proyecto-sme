(function() {
  'use strict';

  angular
    .module('appSme')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('amber');

    // $mdDateLocaleProvider.formatDate = function(date) {
    //   moment.locale('es');
    //   console.log('Dando formato?');
    //   console.log(moment(date).format('L'));
    //   return moment(date).format('L');
    // };
  }

})();
