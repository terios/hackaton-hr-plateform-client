(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("TeamsController", TeamsController);

  /** @ngInject */
  function TeamsController(teamsService) {
    var vm = this;
    vm.create = create;
    vm.remove = remove;
    vm.teams = [];
    //vm.teams = [{ id: 0, title: "UX" },{ id: 1, title: "CONTENT" }];

    function activate() {
      refreshList()
    }
    function refreshList(){
      teamsService.getAll().then(function(resp){
        vm.teams = resp;
      },function(err){
        console.log(err);
      })
    }
    function create(isFormvalid) {
      if(isFormvalid){
        teamsService.create(vm.team).then(function(resp){
          refreshList()
        },function(err){
          console.log(err);
        })
      }else{
        console.log('invalid form');
      }
    }
    function remove(id){
      teamsService.remove(id).then(function(resp){
        refreshList()
      },function(err){
        console.log(err);
      })
    }
    activate();
  }
})();
