angular.module('wsiApp',[])
  .controller('mainCtrl', ['$scope','$http', function($scope,$http){
  // creating model for item returned from server
    $scope.item = {
      name: "",
      price: "",
      poi: [],
      info: [],
      img: "",
      quantity: 1
    };
    // set state that we are in
      $scope.state = "California"; // dynamic based on users location or preference
    // setting an array for manipulation / toggling of items returned from server
    $scope.items = [];
    // initializing data from server
    $scope.dataInit = function(){
      $http.get('https://quiet-headland-38798.herokuapp.com/api/item')
        .then(function(res){
            $scope.smallImages = [];
            $scope.items = res.data;
            $scope.activeItem = res.data[0];
            $scope.item.name = $scope.activeItem.name;
            $scope.item.price = $scope.activeItem.price;
            $scope.item.poi = $scope.activeItem.poi;
            $scope.item.info = $scope.activeItem.info;
            $scope.item.img = $scope.activeItem.img.large;
            res.data.forEach(function(e){
                var img = {
                  img: e.img.small
                }
                $scope.smallImages.push(img);
            });
        })
        .catch(function(err){
          //error handling here
        })
    };
    // scope-side toggling for expand/collapse feature
    $scope.toggle = function(i){
      i.toggle = !i.toggle;
    };
    // scope-side selecting for small apron images && update scope for larger image/info
    $scope.activate = function(image){
      $scope.smallImages.forEach(function(e){
        delete e.active;
      });
      $scope.smallImages.forEach(function(i){
        if(image.img === i.img){
          i.active = true;
          $scope.items.forEach(function(s){
              if(image.img === s.img.small){
                $scope.item = {
                  name: s.name,
                  price: s.price,
                  poi: s.poi,
                  info: s.info,
                  img: s.img.large,
                  quantity: 1
                };
              }
          });
        }
      });
    };
  }]);
