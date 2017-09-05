(function() {
  "use strict";
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  }

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  angular
    .module("hackatons")
    .factory("BearerAuthInterceptor", function($window, $q) {
      return {
        request: function(config) {
          config.headers = config.headers || {};
          if (getCookie("token")) {
            // may also use sessionStorage
            config.headers.Authorization = "Bearer " + getCookie("token");
          }
          return config || $q.when(config);
        },
        response: function(response) {
          console.log(response);
          if (response.status === 401) {
            console.log("should redirect to login");
          }
          return response || $q.when(response);
        }
      };
    })
    .config(config)
    .run(run);
  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = "toast-top-right";
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $httpProvider.interceptors.push("BearerAuthInterceptor");
  }

  /** @ngInject */
  function run($rootScope) {
    if (getCookie("token")) {
      $rootScope.user = parseJwt(getCookie("token"));
      if ($rootScope.user && $rootScope.user.role[0] == "admin") {
        $rootScope.user.isAdmin = true;
      }
      console.log($rootScope.user);
    }
  }
})();
