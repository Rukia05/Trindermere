var carteApp = angular.module('carteApp', []);

carteApp.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
});

/*carteApp.factory('API', function($http) {
    return {
        majPosition: function(url, longitude, latitude) {
            return $http({
                url: url,
                data: { longitude: longitude, latitude: latitude },
                method: 'PATCH',
                transformRequest: function(data, headersGetter){
                    var headers = headersGetter();
                    headers['Authorization'] = 'Basic ' + btoa('arborphile' + ':' + 'ilovetrees');
                }
            });
        }
    };
});*/

carteApp.controller('TreeListCtrl', function($scope, API) {
    $scope.trees = [];
    API.getTrees().then(function(trees) {
        /*$scope.messages.push({
          type: 'success',
          message: 'Tree list fully loaded'
        });*/
        console.log("tree list fully loaded");
        $scope.trees = trees;
    }, 
    function() { // error handling
        $scope.messages.push({
          type: 'danger',
          message: 'Tree list loading failed'
        });
      }, 
    function(trees) { // update
        //$scope.messages.push({
        //  type: 'info',
        //  message: 'Tree list updated'
        //});
    $scope.trees.push.apply($scope.trees, trees);
      });
    });
/*{
              longitude: longInput.value,
              latitude: latInput.value,
            }*/

carteApp.controller('TreePatchCtrl', function($scope, $http, API) {
    console.log(API);
    $scope.patch = function() {
            var id = $scope.idarbre;
            var data = {longitude: longInput.value, latitude: latInput.value};
            console.log("data " + data);
            API.patchTree(id, data).then(function() {
              $scope.messages.push({
                type: 'success',
                message: 'Tree ' + id + ' patched'
              });
            });
          };
        });

carteApp.controller('MainCtrl', function ($scope, API) {
	console.log("ici c'est le main");
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
});
