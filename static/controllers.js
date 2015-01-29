mapTrees = {};

carteApp.controller('TreeListCtrl', function($scope, $http,API) {
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
        angular.forEach($scope.data, function(value, key) {
            var i;

            for (i = 0; i < value.length; i++) {
                value[i].id = id;
                value[i].idArbre = key; 
                value[i].onclicked = function (marker) {
                    $scope.longitude=marker.model.longitude;
                    $scope.latitude=marker.model.latitude;
                    $scope.idarbre = marker.model.idArbre;
                }
                id++;
            }
        });
    });




});

carteApp.controller('TreePatchCtrl', function($scope, $http, API) {




    $scope.patch = function() {
        var id = $scope.idarbre;
        var data = {longitude: longInput.value, latitude: latInput.value};

        var longitudeNumber = parseFloat(longInput.value.replace(",","."));
        var latitudeNumber = parseFloat(latInput.value.replace(",","."));

        console.log("longitude " + longitudeNumber + " " + typeof longitudeNumber);
        console.log("latitude " + latitudeNumber + " " + typeof latitudeNumber);
      
        if(jQuery.isEmptyObject(mapTrees) ) {
            API.getTrees().then(function(trees) {
                console.log("tree list fully loaded");
                $scope.trees = trees;

                //on contruit une map qui contient l'ID en clé et l'arbre en valeur
                indexID = 50 //l'URL avant l'ID est composé de 50 caractères 
                for (var i=0; i<trees.length; i++)
                {
                    var idTree = trees[i].url.substring(indexID, trees[i].url.length-1);
                    mapTrees[idTree] = trees[i];
                }

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
                     alert("L'arbre " + id + " a bien été mis à jour")
                 });
                }
            });
        }
    else {
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
             alert("L'arbre " + id + " a bien été mis à jour")
         });
        }
    }
    };

});

carteApp.controller('MainCtrl', function ($scope,$http, API) {
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";



});




