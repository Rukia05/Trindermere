var carteApp = angular.module('carteApp', []);

carteApp.controller('MainCtrl',['$scope',function ($scope) {
	$scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
    $scope.addBase = function(latitude,longitude,identifiant) {
        //TODO Ajout dans la base
        alert("ajouter dans la base : "+latitude+','+longitude+','+identifiant);
    }
}]);