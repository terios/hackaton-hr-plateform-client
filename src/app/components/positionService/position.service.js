
(function() {
  "use strict";

  angular.module("hackatons").factory("positionService", positionService);

  /** @ngInject */
  function positionService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      getAll: getAll,
      create: create,
      remove: remove
    };

    return service;

    function getAll() {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/positions")
        .then(function(response){
          deferred.resolve(response.data);
        })
        .catch(function(response){
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function create(data) {
      var deferred = $q.defer();
      $http
        .post(apiHost + "/positions", data)
        .then(function(response){
          deferred.resolve(response.data);
        })
        .catch(function(response){
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function remove(data) {
      var deferred = $q.defer();
      $http
        .delete(apiHost + "/positions/"+data)
        .then(function(response){
          deferred.resolve(response.data);
        })
        .catch(function(response){
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }
  }
})();
