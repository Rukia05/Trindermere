carteApp.controller('TreeListCtrl', function($scope, API, $filter) {
    $scope.trees = [];
    API.getTrees().then(function(trees) {
        console.log("tree list fully loaded");
        $scope.trees = trees;
    }, function() { // error handling
    }, function(trees) { // update
        $scope.trees.push.apply($scope.trees, trees);
      });
    });

carteApp.controller('TreePatchCtrl', function($scope, $http, API) {
    console.log(API);
    $scope.patch = function() {
            var id = $scope.idarbre;
            var data = {longitude: longInput.value, latitude: latInput.value};
            console.log("data " + data);
            API.patchTree(id, data).then(function() {
                console.log("Tree " + id + "succesfully patched")
            });
          };
        });

carteApp.controller('MainCtrl', function ($scope, API) {
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
});
