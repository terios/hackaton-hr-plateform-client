(function() {
  "use strict";

  angular.module("hackatons").controller("LoginController", LoginController);

  /** @ngInject */
  function LoginController($stateParams, authService) {
    var vm = this;
    vm.user = {};
    vm.login = login;
    function activate() {
      if ($stateParams.type) {
        vm.accountType = $stateParams.type;
      }
    }
    function login(isFormValid) {
      if (isFormValid) {
        console.log("authenticating");
        authService.login(vm.user).then(
          function(resp) {
            console.log("ok ", resp);
          },
          function(resp) {
            console.log("ko ", resp);
          }
        );
      }
    }
    activate();
  }
})();
