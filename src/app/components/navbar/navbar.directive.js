(function() {
  "use strict";

  angular.module("hackatons").directive("acmeNavbar", acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: "E",
      templateUrl: "app/components/navbar/navbar.html",
      scope: {
        creationDate: "="
      },
      controller: NavbarController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope) {
      var vm = this;
      vm.user = $rootScope.user;
    }
  }
})();
