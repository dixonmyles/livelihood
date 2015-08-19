angular.module('Been').controller('AuthCtrl', ['$scope', '$location', 'auth', function($scope, $location, auth){
    $scope.user = {};

    $scope.register = function(){
      console.log('Trying to register!');
      auth.register($scope.user).error(function(err){
        console.log('Error:', err);
        $scope.error = err;
      }).then(function(){
        console.log('Success!');
        $location.path('/login');
      });
    };

    $scope.login = function(){
      auth.logIn($scope.user).error(function(err){
        $scope.error = err;
      }).then(function(){
        $location.path('home');
      });
    };
}]);
