angular.module('Been').config(function($routeProvider){
  $routeProvider
    .when('/', {
      redirectTo: '/home'
    })

    .when('/home', {
      templateUrl: "assets/templates/home.html",
      controller: "MainCtrl"
    })

    .when('/badges', {
      templateUrl: "assets/templates/badges/index.html",
      controller: "BadgesIndexCtrl"
    })

    .when('/badges/:id', {
      templateUrl: "assets/templates/badges/show.html",
      controller: "BadgesShowCtrl"
    })

    .when('/login', {
      templateUrl: "assets/templates/login.html",
      controller: "AuthCtrl"
    })

    .when('/register', {
      templateUrl: "assets/templates/register.html",
      controller: "AuthCtrl"
    })
});
