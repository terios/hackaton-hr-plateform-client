(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("CreateUserController", CreateUserController);

  /** @ngInject */
  function CreateUserController() {
    var vm = this;
    vm.createUser = createUser;
    vm.upload = upload;

    vm.teams = [
      {
        name: "ux team"
      },
      {
        name: "monetisation"
      },
      {
        name: "real estate"
      }
    ];
    vm.positions = [
      {
        name: "developer"
      },
      {
        name: "PM"
      },
      {
        name: "Cs"
      }
    ];
    function activate() {}
    function createUser() {
      var data = Object.assign({}, vm.user)
      if(vm.user.position && vm.user.position[0]){
        data.position = vm.user.position[0].name;
      }
      if(vm.user.team && vm.user.team[0]){
        data.team = vm.user.team[0].name;
      }
      console.log("in create user");
      console.log(data);
    }
    function upload() {
      console.log("in upload");
    }
    activate();
  }
})();
