(function() {
  "use strict";

  angular.module("hackatons").factory("employeesService", employeesService);

  /** @ngInject */
  function employeesService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      getAll: getAll,
      create: create,
      getById: getById,
      update: update,
      remove: remove
    };

    return service;

    function getAll(data) {
      var deferred = $q.defer();
      $http
        .get(apiHost + "/employees")
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
        .get(apiHost + "/employees/" + id)
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
        .post(apiHost + "/employees", data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          // $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          deferred.reject(response);
        });
      return deferred.promise;
    }

    function update(id, data) {
      var deferred = $q.defer();
      $http
        .put(apiHost + "/employees/" + id, data)
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
        .delete(apiHost + "/employees/" + data)
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
