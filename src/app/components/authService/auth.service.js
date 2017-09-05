(function() {
  "use strict";

  angular.module("hackatons").factory("authService", authService);

  /** @ngInject */
  function authService($log, $http, $q) {
    var apiHost = "http://localhost:8080";

    var service = {
      login: login
    };

    return service;

    function login(data) {
      var deferred = $q.defer();
      $http
        .post(apiHost + "/login", data)
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
