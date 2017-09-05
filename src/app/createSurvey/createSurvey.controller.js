(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("CreateSurveyController", CreateSurveyController);

  /** @ngInject */
  function CreateSurveyController(
    $timeout,
    surveyService,
    $state,
    teamsService,
    positionService
  ) {
    var vm = this;

    activate();
    vm.survey = {
      type: "360"
    };
    vm.create = create;
    vm.addRule = addRule;
    vm.addTopic = addTopic;
    vm.addQuestion = addQuestion;
    vm.addResponce = addResponce;
    vm.who = [{ title: "All", value: "all" }];
    vm.whom = [
      { title: "All", value: "all" },
      { title: "His position", value: "his-position" },
      { title: "His team", value: "his-team" }
    ];
    function activate() {
      $(".input-daterange").datepicker({
        autoclose: true,
        todayHighlight: true
      });
      teamsService.getAll().then(
        function(teamsList) {
          teamsList = teamsList.map(function(elm) {
            return { title: elm.title + " team", value: "team-" + elm.title };
          });
          positionService.getAll().then(
            function(positionsList) {
              positionsList = positionsList.map(function(elm) {
                return {
                  title: elm.title + " position",
                  value: "position-" + elm.title
                };
              });

              vm.who = vm.who.concat(teamsList).concat(positionsList);
              vm.whom = vm.whom.concat(teamsList).concat(positionsList);
            },
            function() {
              console.log("error");
            }
          );
        },
        function() {}
      );
    }

    function addRule() {
      if (!vm.survey.hasOwnProperty("rules")) {
        vm.survey.rules = [];
      }
      vm.survey.rules.push({
        whoOptions: vm.who.splice(vm.who),
        whomOptions: vm.whom.splice(vm.whom)
      });
    }
    function addTopic() {
      if (!vm.survey.hasOwnProperty("topics")) {
        vm.survey.topics = [];
      }
      vm.survey.topics.push({});
    }
    function addQuestion(index) {
      if (!vm.survey.topics[index].hasOwnProperty("questions")) {
        vm.survey.topics[index].questions = [];
      }
      vm.survey.topics[index].questions.push({});
    }
    function addResponce(topic, index) {
      if (!topic.questions[index].hasOwnProperty("responses")) {
        topic.questions[index].responses = [];
      }
      topic.questions[index].responses.push({});
    }
    function create() {
      var data = Object.assign({}, vm.survey);
      if (data.rules) {
        data.rules.map(function(e) {
          delete e["whomOptions"];
          delete e["whoOptions"];
          e.who = e.who && e.who.length > 0 ? e.who[0].value : "";
          e.whom = e.whom && e.whom.length > 0 ? e.whom[0].value : "";
          return e;
        });
      }
      console.log("clicked on submit");
      console.log(JSON.stringify(data));
      console.log(data);
      surveyService.create(data).then(
        function(resp) {
          $state.go("dashBoard");
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
})();
