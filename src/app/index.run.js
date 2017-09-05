(function() {
  'use strict';

  angular
    .module('hackatons')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
