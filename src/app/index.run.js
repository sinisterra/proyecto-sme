(function() {
  'use strict';

  angular
    .module('appSme')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
