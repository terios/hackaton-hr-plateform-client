(function() {
  "use strict";

  angular
    .module("hackatons")
    .controller("DoSurveyController", DoSurveyController);

  /** @ngInject */
  function DoSurveyController(
    $timeout,
    $stateParams,
    surveyService,
    $rootScope
  ) {
    var vm = this;
    vm.doSurvey = doSurvey;
    vm.rateUser = rateUser;
    vm.maxRate = 5;
    vm.hoveringOver = hoveringOver;
    vm.ratingCategories = [
      "PERFORMANCE",
      "INNOVATION",
      "HAPPINESS",
      "LEADERSHIP",
      "RELATION"
    ];
    function activate() {
      var id = $stateParams.surveyid;
      getSurvey(id);
    }
    function doSurvey() {
      var answers = [];

      for (var topicId in vm.survey.topics) {
        for (var questionId in vm.survey.topics[topicId].questions) {
          var tmp = {
            question: vm.survey.topics[topicId].questions[questionId].name
          };
          for (var responcesId in vm.survey.topics[topicId].questions[
            questionId
          ].responses) {
            if (
              vm.survey.topics[topicId].questions[questionId].responses[
                responcesId
              ].selected
            ) {
              tmp.answer = {
                text:
                  vm.survey.topics[topicId].questions[questionId].responses[
                    responcesId
                  ].text,
                weight:
                  vm.survey.topics[topicId].questions[questionId].responses[
                    responcesId
                  ].weight
              };
              answers.push(tmp);
            }
          }
        }
      }
      // console.log(vm.survey);
      // console.log(answers);
      surveyService.doSurvey($stateParams.surveyid, { answers: answers }).then(
        function(data) {
          console.log(data);
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function rateUser(user, category, rating) {
      console.log(user, category, rating);
      surveyService
        .rateUser($stateParams.surveyid, user._id, category, rating)
        .then(
          function(data) {
            console.log(data);
          },
          function(err) {
            console.log(err);
          }
        );
    }
    function hoveringOver(value) {
      vm.overStar = value;
      vm.percent = value / vm.max;
    }

    function getSurvey(id) {
      surveyService.getById(id).then(
        function(resp) {
          vm.survey = resp;
          if (vm.survey.type == "360") {
            getUserForSurvey(id);
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }

    function getUserForSurvey(id) {
      surveyService.getSurveyUser(id).then(
        function(resp) {
          vm.users = resp;
          getOldRatings();
        },
        function(err) {
          console.log(err);
        }
      );
    }
    function getOldRatings() {
      surveyService.getOldRatings($stateParams.surveyid).then(
        function(data) {
          var oldRatings = data.evaluations.find(function(elm) {
            return elm.employee == $rootScope.user.id;
          });
          oldRatings = oldRatings.ratings;
          if (oldRatings && oldRatings.length > 0) {
            vm.users = vm.users.map(function(user) {
              var ratings = oldRatings.filter(function(elm) {
                return elm.employee == user._id;
              });
              if (ratings && ratings.length > 0) {
                user.rate = {};
                ratings.map(function(rating) {
                  user.rate[rating.rateCategory] = rating.rate;
                });
              }
              return user;
            });
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
    activate();
  }
})();
