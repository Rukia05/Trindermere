script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
var carteApp = angular.module('carteApp', []);

carteApp.controller('MainCtrl',['$scope',function ($scope) {
	$scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
    $scope.addBase = function(latitude,longitude,identifiant) {
    	$.ajax({
            url: 'https://rencontres-arbres.herokuapp.com/api/trees/AR17026/',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            username: 'arborphile',
            password: 'ilovetrees',
            type: 'PUT',
            data: '{"name":"fjdlk fhg"}';
        });
        alert("ajouter dans la base : "+latitude+','+longitude+','+identifiant);

    }
}]);
