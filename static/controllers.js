mapTrees = {};

carteApp.controller('TreeListCtrl', function($scope, API, $filter, $http) {
    $scope.trees = [];
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

        //lecture du fichier
        $http.get('/static/dups.json').then(function(response){
            $scope.data = response.data;
            console.log($scope.data);
        })
        
        //console.log("taille " + trees.length);
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
            //var treesDataBase = $scope.trees;

            var longitudeNumber = parseFloat(longInput.value.replace(",","."));
            var latitudeNumber = parseFloat(latInput.value.replace(",","."));
            
            console.log("longitude " + longitudeNumber + " " + typeof longitudeNumber);
            console.log("latitude " + latitudeNumber + " " + typeof latitudeNumber);
            
            if (!(id in mapTrees))
            {
                alert("ID de l'arbre inexistant");
            }

            if (longInput.value == "" || latInput.value == "" || id == "") {
                // TODO : améliorer le rendu visuel du message d'erreur (pas d'"alert")
                alert("Les champs ne sont pas tous remplis");
            } else if (isNaN(longitudeNumber) || isNaN(latitudeNumber)) {
                // TODO : améliorer le rendu visuel du message d'erreur (pas d'"alert")
                alert("Les champs ne sont pas corrects");
            } else {
                API.patchTree(id, data).then(function() {
                    console.log("Tree " + id + "succesfully patched")
                });
            }
            
          };
        });

carteApp.controller('MainCtrl', function ($scope, API) {
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
});
