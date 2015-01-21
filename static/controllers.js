mapTrees = {};

carteApp.controller('TreeListCtrl', function($scope, API, $filter) {
    $scope.trees = [];
    API.getTrees().then(function(trees) {
        var doub = false;
        console.log("tree list fully loaded");
        $scope.trees = trees;
        //on contruit une map qui contient l'ID en clé et l'arbre en valeur
        indexID = 50 //l'URL avant l'ID est composé de 50 caractères 
        for (var i=0; i<trees.length; i++)
        {
            var idTree = trees[i].url.substring(indexID, trees[i].url.length-1);
            mapTrees[idTree] = trees[i];
        }
        //console.log("url "+ trees[200].url);
        for(i=0; i<trees.length;i++){
            for(j=0;j<trees.length;j++){
                if(trees[i].url==trees[j].url && (trees[i].latitude!==trees[j].latitude || trees[i].longitude!==trees[j].longitude)){
                    console.log("Doublon!! url i = "+ trees[i].url + "url j = " +trees[j].url + "lat i " + trees[i].latitude + "lat j " + trees[j].latitude + "long i " + trees[i].longitude + "long j" + trees[j].longitude);
                    doub = true;
                }
            }
        }
        if(doub==false){
            console.log("Pas de doublon détecté.");
        }

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
