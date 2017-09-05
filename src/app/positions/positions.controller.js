(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("PositionsController", PositionsController);

  /** @ngInject */
  function PositionsController(positionService) {
    var vm = this;
    vm.create = create;
    vm.remove = remove;

    vm.positions = [];//[{ id: 0, title: "Dev" },{ id: 1, title: "PM" }];

    function activate() {
      refreshList()
    }
    function refreshList(){
      positionService.getAll().then(function(resp){
        vm.positions = resp;
      },function(err){
        console.log(err);
      })
    }
    function create(isFormvalid) {
      if(isFormvalid){
        positionService.create(vm.position).then(function(resp){
          refreshList()
        },function(err){
          console.log(err);
        })
      }else{
        console.log('invalid form');
      }
    }
    function remove(id){
      positionService.remove(id).then(function(resp){
        refreshList()
      },function(err){
        console.log(err);
      })
    }

    activate();
  }
})();
