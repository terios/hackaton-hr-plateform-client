(function() {
  "use strict";

  angular.module("hackatons").factory("surveyService", surveyService);

  /** @ngInject */
  function surveyService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      getAll: getAll,
      create: create,
      getById: getById,
      get360ResultsById: get360ResultsById,
      getMotivationResultsById: getMotivationResultsById,
      getSurveyUser: getSurveyUser,
      getOldRatings: getOldRatings,
      rateUser: rateUser,
      stopSurvey: stopSurvey,
      remove: remove,
      doSurvey: doSurvey
    };

    return service;

    function getAll(data) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys")
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function getById(id) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys/" + id)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function get360ResultsById(id) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys/result?type=360&survey_id=" + id)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }
    function getMotivationResultsById(id, filter) {
      var filter = filter || "team";
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys/result?type=motivation&by="+filter+"&survey_id=" + id)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function stopSurvey(id) {
      var deferred = $q.defer();
      $http
        .put(apiHost + "/surveys/" + id + "/stop")
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function getSurveyUser(id) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys/" + id + "/users")
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function getOldRatings(id) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/surveys/" + id + "/ratings")
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function rateUser(id, user_id, rateCategory, rate) {
      var deferred = $q.defer();
      var rateData = {
        employee: user_id,
        rate: rate,
        rateCategory: rateCategory
      };
      $http
        .post(apiHost + "/surveys/" + id + "/rate", rateData)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function create(data) {
      var deferred = $q.defer();
      $http
        .post(apiHost + "/surveys", data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function doSurvey(id, data) {
      var deferred = $q.defer();
      $http
        .post(apiHost + "/surveys/" + id + "/result", data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function remove(data) {
      var deferred = $q.defer();
      $http
        .delete(apiHost + "/surveys/" + data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }
  }
})();
