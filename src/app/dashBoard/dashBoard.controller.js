(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("DashBoardController", DashBoardController);

  /** @ngInject */
  function DashBoardController($timeout, surveyService) {
    var vm = this;

    activate();
    vm.currentSurveys = [];
    vm.endedSurveys = [];
    vm.futureSurveys = [];
    vm.stopSurvey = stopSurvey;
    function activate() {
      surveyService.getAll().then(
        function(resp) {
          vm.endedSurveys = resp.filter(function(elm) {
            return elm.state == "ended" || elm.state == "stopped";
          });
          vm.currentSurveys = resp.filter(function(elm) {
            return elm.state == "activated";
          });
          vm.futureSurveys = resp.filter(function(elm) {
            return elm.state == "scheduled";
          });
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function stopSurvey(id) {
      console.log("stop survey -->", id);
      surveyService.stopSurvey(id).then(
        function(data) {
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
})();
