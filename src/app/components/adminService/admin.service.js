(function() {
  "use strict";

  angular.module("hackatons").factory("adminService", adminService);

  /** @ngInject */
  function adminService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      create: create
    };

    return service;

    function create(data) {
      var deferred = $q.defer();
      $http
        .post(apiHost + "/users", data)
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
