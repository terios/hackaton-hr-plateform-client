(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("EmployeeProfileController", EmployeeProfileController);

  /** @ngInject */
  function EmployeeProfileController(
    radarChart,
    $stateParams,
    teamsService,
    $rootScope,
    employeesService,
    positionService
  ) {
    var vm = this;
    vm.team = {};
    vm.mapPosition = mapPosition;
    vm.remove = remove;
    vm.updateEmployee = updateEmployee;
    vm.employees = [];
    function activate() {
      vm.currentUser = $rootScope.user;
      if (vm.currentUser) {
        vm.isAdmin = vm.currentUser.isAdmin;
      }
      getPositions();
      getTeams();
      getEmployee($stateParams.employeeid);
    }
    function getEmployee(id) {
      employeesService.getById(id).then(
        function(data) {
          console.log(data);
          vm.user = data;
        },
        function(err) {
          console.log(err);
        }
      );
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

    function getTeams() {
      teamsService.getAll().then(
        function(data) {
          vm.teams = data;
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
    function updateEmployee() {
      var tmp = Object.assign({}, vm.user);
      tmp.team = tmp.team._id;
      tmp.position = tmp.position._id;
      console.log(tmp);
      employeesService.update(tmp._id, tmp).then(
        function(data) {
          activate();
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function mapPosition(positionId) {
      var position = vm.positions.find(function(item) {
        if (item._id == positionId) {
          return item;
        }
      });
      if (position && position.title) {
        return position.title;
      }
      return "";
    }
    activate();
  }
})();
