angular.module('wsiApp',[])
  .controller('mainCtrl', ['$scope','$http', function($scope,$http){
    $scope.dataInit = function(){
      console.log('this is happening')
      $http.get('localhost:3000/api/data')
        .then(function(res){
            console.log(res)
        })
        .catch(function(){
          console.log('this')
        })
    };
  }]);
