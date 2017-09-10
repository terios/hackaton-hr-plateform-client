(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("surveyDetailsController", surveyDetailsController);

  /** @ngInject */
  function surveyDetailsController(radarChart, barChart, $stateParams, surveyService, positionService, teamsService) {
    var vm = this;
    vm.selectedResult = {};
    vm.survey = {};
    vm.getDetails = getDetails;
    vm.globalResult = globalResult;
    vm.mapPosition = mapPosition;
    vm.mapTeam = mapTeam;

    function activate() {
      getSurvey($stateParams.surveyid);
      getTeams();
      getPositions();
    }

    function getSurvey(id) {
      surveyService.getById(id).then(
        function(resp) {
          vm.survey = resp;
          if(vm.survey.type=="360"){
            get360SurveyResults($stateParams.surveyid);
          }else{
            getMotivationResults($stateParams.surveyid);
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function getMotivationResults(id, filter){
      surveyService.getMotivationResultsById(id, filter).then(
        function(resp) {
          /*vm.results = resp.map(function(elm, key) {
            var tmp = {};
            for (var i = 0; i < elm.ratings.length; i++) {
              tmp[elm.ratings[i].rateCategory] = {
                avg: elm.ratings[i].avg,
                min: elm.ratings[i].min,
                max: elm.ratings[i].max
              };
            }
            elm.ratings = tmp;
            return elm;
          });*/
          vm.results = resp;
          console.log(vm.results);
          new Chart(
            document.getElementById("canvas"),
            barChart.getChartConfig(vm.survey.title, [{"avg":1.4,"survey_id":"59b57f946c964a7325bfbffe","survey_date":"2017-09-07T23:00:00.000Z","team":"money"}, {"avg":2.4,"survey_id":"59b57f946c964a7325bfbffe","survey_date":"2017-09-07T23:00:00.000Z","team":"UX"}])
            //barChart.getChartConfig(vm.survey.title, vm.results)
          );
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function get360SurveyResults(id) {
      var navHeight = $(".navbar").outerHeight(true) + 10;
      $(".sticky-chart").affix({
        offset: {
          top: function() {
            var navOuterHeight = $("#masthead").height();
            return (this.top = navOuterHeight);
          }
        }
      });
      surveyService.get360ResultsById(id).then(
        function(resp) {
          vm.results = resp.map(function(elm, key) {
            var tmp = {};
            for (var i = 0; i < elm.ratings.length; i++) {
              tmp[elm.ratings[i].rateCategory] = {
                avg: elm.ratings[i].avg,
                min: elm.ratings[i].min,
                max: elm.ratings[i].max
              };
            }
            elm.ratings = tmp;
            return elm;
          });
          //vm.results = resp;
          console.log(vm.results);

        },
        function(err) {
          console.log(err);
        }
      );
    }

    function getDetails(member) {
      vm.selectedResult = member;
      var title = vm.selectedResult.firstName + " - " + vm.selectedResult.lastName;
      console.log(member);
      new Chart(
        document.getElementById("canvas"),
        radarChart.getChartConfig(title, member)
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

    function mapTeam(teamId) {
      var team =  vm.teams.find(function(item){
        if(item._id == teamId){
          return item;
        }
      })
      if(team && team.title){
        return team.title;
      }
      return '';
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
