mapTrees = {};

//Controleur permettant de gerer la liste des arbres sur la page
carteApp.controller('TreeListCtrl', function($scope, $http,API) {
    $scope.trees = [];


    //Affichage du tableau pour selection de ligne
    $scope.selectDups = function(dups) {
        $scope.selectedDups = dups;
        console.log(dups);
    };

    //Affichage et centrage de la map
    $scope.map = {
        center: {
            latitude: 45.777403199999990000,
            longitude: 4.855214400000023000
        },
        zoom: 15
    };

    //Recuperation des doublons a partir du fichier json et fonction pour ajouter infos du marqueur dans la fonction de mise à jour quand clic sur le marqueur
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

//Controleur permettant la mise a jour dans la base
carteApp.controller('TreePatchCtrl', function($scope, $http, API) {



    //Mise a jour de la base - fonction déclenchée par clic sur bouton mettre a jour
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
                     alert("L'arbre " + id + " a bien ete mis a jour")
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
             alert("L'arbre " + id + " a bien ete mis a jour")
         });
        }
    }

    //Fonction permettant la mise a jour du tableau avec suppression des doublons deja cliques
    angular.forEach($scope.data, function(value, key) {

            var i;

            for (i = 0; i < value.length; i++) {
                if(key===id){
                    console.log("value[i].id " + value[i].id);
                    value.splice(key,value.length);
                    
                }
                
                console.log(value[i]);
            }
                
            
        });
    
    
   
    };

});

//Controleur pour definir variables d'affichage sur la carte
carteApp.controller('MainCtrl', function ($scope,$http, API) {
    $scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";



});




