angular.module('Been').factory('Badge', function($resource){
  return $resource('/badges/:id');
})
