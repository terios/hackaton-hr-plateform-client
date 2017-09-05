(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("TeamDetailsController", TeamDetailsController);

  /** @ngInject */
  function TeamDetailsController(
    radarChart,
    $stateParams,
    teamsService,
    employeesService,
    positionService
  ) {
    var vm = this;
    vm.team = {};
    vm.mapPosition = mapPosition;
    vm.remove = remove;
    vm.addEmployee = addEmployee;
    vm.employees = [];
    function activate() {
      getPositions();
      getEmployees();
      getTeam($stateParams.teamid);
    }
    function getTeam(id){
      teamsService.getById(id).then(function(data){
        console.log(data);
        vm.team = data;
      }, function(err){
        console.log(err);
      })
    }
    function getPositions() {
      positionService.getAll().then(
        function(data) {
          vm.positions = data;
        },
        function(err) {
          console.log("recieved this err ", err);
        }
      );
    }

    function getEmployees() {
      employeesService.getAll().then(
        function(data) {
          vm.employees = data;
          console.log('employees ', data);
        },
        function(err) {
          console.log("recieved this err ", err);
        }
      );
    }

    function remove(id) {
      employeesService.remove(id).then(
        function(data) {
          activate();
        },
        function(err) {
          console.log("recieved this err ", err);
        }
      );
    }
    function addEmployee(){
      var tmp = Object.assign({}, JSON.parse(vm.newUser))
       tmp.team = $stateParams.teamid;
      employeesService.update(tmp._id, tmp).then(function(data){
        activate();
      }, function(err){
        console.log(err);
      })
    }
    function mapPosition(positionId) {
      var position =  vm.positions.find(function(item){
        if(item._id == positionId){
          return item;
        }
      })
      if(position && position.title){
        return position.title;
      }
      return '';
    }
    activate();
  }
})();
