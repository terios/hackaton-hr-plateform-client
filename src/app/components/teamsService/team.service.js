(function() {
  "use strict";

  angular.module("hackatons").factory("teamsService", teamsService);

  /** @ngInject */
  function teamsService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      getAll: getAll,
      create: create,
      getById: getById,
      remove: remove
    };

    return service;

    function getAll(data) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/teams")
        .then(function(response){
          deferred.resolve(response.data);
        })
        .catch(function(response){
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function getById(id) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/teams/"+id)
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
        .post(apiHost + "/teams", data)
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
        .delete(apiHost + "/teams/"+data)
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
