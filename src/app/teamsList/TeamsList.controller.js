(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("TeamsListController", TeamsListController);

  /** @ngInject */
  function TeamsListController(
    radarChart,
    $stateParams,
    $location,
    teamsService,
    positionService
  ) {
    var vm = this;
    vm.teams = [];
    vm.positions = [];
    vm.mapPosition = mapPosition;
    vm.goProfile = goProfile;

    function activate() {
      getPositions();
      getTeams();
    }
    function getTeams() {
      teamsService.getAll().then(
        function(data) {
          vm.teams = data;
          initiateSlider();
        },
        function(err) {
          console.log("recieved this err ", err);
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
    function initiateSlider() {
      setTimeout(function() {
        for (var index in vm.teams) {
          $(".slider" + index).owlCarousel({
            items: 4
          });
        }
      }, 0);
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
    function goProfile(id) {
      $location.path("/employee/" + id);
    }
    activate();
  }
})();
