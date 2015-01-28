mapTrees = {};

carteApp.controller('TreeListCtrl', function($scope, $http) {
        $scope.trees = [];
        $scope.selectDups = function(dups) {
            $scope.selectedDups = dups;
            console.log(dups);
        };

        $scope.map = {
            center: {
                latitude: 45.777403199999990000,
                longitude: 4.855214400000023000
            },
            zoom: 15
        };


        $http.get('/static/dups.json').then(function(response){
            $scope.data = response.data;
            var id = 0;
            angular.forEach($scope.data, function(value) {
            var i;
            for (i = 0; i < value.length; i++) {
                value[i].id = id;
                id++;
            }
        });
        });

        

    });

carteApp.controller('TreePatchCtrl', function($scope, $http, API) {
    console.log(API);
    $scope.patch = function() {
            var id = $scope.idarbre;
            var data = {longitude: longInput.value, latitude: latInput.value};

            var longitudeNumber = parseFloat(longInput.value.replace(",","."));
            var latitudeNumber = parseFloat(latInput.value.replace(",","."));
            
            console.log("longitude " + longitudeNumber + " " + typeof longitudeNumber);
            console.log("latitude " + latitudeNumber + " " + typeof latitudeNumber);
            
            if (!(id in mapTrees))
            {
                alert("ID de l'arbre inexistant");
            }

            if (longInput.value == "" || latInput.value == "" || id == "") {
                alert("Les champs ne sont pas tous remplis");
            } else if (isNaN(longitudeNumber) || isNaN(latitudeNumber)) {
                alert("Les champs ne sont pas corrects");
            } else {
                API.patchTree(id, data).then(function() {
                    console.log("Tree " + id + "succesfully patched")
                });
            }
            
          };
        });

carteApp.controller('MainCtrl', function ($scope,$http, API) {
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
          


    });


           
    
