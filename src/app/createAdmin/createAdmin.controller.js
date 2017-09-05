(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("CreateAdminController", CreateAdminController);

  /** @ngInject */
  function CreateAdminController(adminService) {
    var vm = this;
    vm.creatAdmin = creatAdmin;

    function activate() {}
    function creatAdmin() {
      var data = Object.assign({}, vm.user);
      data.role = 'employee';//"admin";
      adminService.create(data).then(function(resp){
        console.log('success ',resp);
      },function(resp){
        console.log('Failed ',resp);
        console.log(resp);
      })
    }
    activate();
  }
})();
