angular.module('Been').controller('BadgesIndexCtrl', function(Badge, $scope){
  $scope.badges = Badge.query();
});
