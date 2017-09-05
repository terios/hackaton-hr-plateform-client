(function() {
  "use strict";

  angular.module("hackatons").config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "app/main/main.html",
        controller: "MainController",
        controllerAs: "main"
      })
      .state("dashBoard", {
        url: "/dashboard",
        templateUrl: "app/dashBoard/dashBoard.html",
        controller: "DashBoardController",
        controllerAs: "vm"
      })
      .state("login", {
        url: "/login/:type",
        templateUrl: "app/login/login.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("createUser", {
        url: "/users/create",
        templateUrl: "app/createUser/createUser.html",
        controller: "CreateUserController",
        controllerAs: "vm"
      })
      .state("createAdmin", {
        url: "/admin/create",
        templateUrl: "app/createAdmin/createAdmin.html",
        controller: "CreateAdminController",
        controllerAs: "vm"
      })
      .state("createSurvey", {
        url: "/survey",
        templateUrl: "app/createSurvey/createSurvey.html",
        controller: "CreateSurveyController",
        controllerAs: "vm"
      })
      .state("details", {
        url: "/survey/report/:surveyid",
        templateUrl: "app/surveyDetails/surveyDetails.html",
        controller: "surveyDetailsController",
        controllerAs: "vm"
      })
      .state("doSurvey", {
        url: "/survey/:surveyid",
        templateUrl: "app/doSurvey/doSurvey.html",
        controller: "DoSurveyController",
        controllerAs: "vm"
      })
      .state("positions", {
        url: "/positions",
        templateUrl: "app/positions/positions.html",
        controller: "PositionsController",
        controllerAs: "vm"
      })
      .state("teamsList", {
        url: "/teamslist",
        templateUrl: "app/teamsList/teamsList.html",
        controller: "TeamsListController",
        controllerAs: "vm"
      })
      .state("team", {
        url: "/team/:teamid",
        templateUrl: "app/teamDetails/TeamDetails.html",
        controller: "TeamDetailsController",
        controllerAs: "vm"
      })
      .state("employee", {
        url: "/employee/:employeeid",
        templateUrl: "app/employeeProfile/employeeProfile.html",
        controller: "EmployeeProfileController",
        controllerAs: "vm"
      })
      .state("teams", {
        url: "/teams",
        templateUrl: "app/teams/teams.html",
        controller: "TeamsController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }
})();
