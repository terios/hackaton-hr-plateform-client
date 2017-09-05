(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("surveyDetailsController", surveyDetailsController);

  /** @ngInject */
  function surveyDetailsController(radarChart, $stateParams, surveyService) {
    var vm = this;
    vm.selectedResult = {};
    vm.survey = {
      members: [
        {
          name: "anas youbi",
          team: "UX team",
          result: "4/5",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
    vm.getDetails = getDetails;
    vm.globalResult = globalResult;

    function activate() {
      vm.survey.name = $stateParams.surveyid;
      var navHeight = $(".navbar").outerHeight(true) + 10;
      $(".sticky-chart").affix({
        offset: {
          top: function() {
            var navOuterHeight = $("#masthead").height();
            return (this.top = navOuterHeight);
          }
        }
      });
      new Chart(
        document.getElementById("canvas"),
        radarChart.getChartConfig(vm.survey.name)
      );
    }
    function getDetails(member) {
      vm.selectedResult = member;
      var title = vm.selectedResult.name + " - " + vm.survey.name;
      new Chart(
        document.getElementById("canvas"),
        radarChart.getChartConfig(title)
      );
    }
    function globalResult() {
      new Chart(
        document.getElementById("canvas"),
        radarChart.getChartConfig(vm.survey.name)
      );
    }

    activate();
  }
})();
