var carteApp = angular.module('carteApp', []);

carteApp.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
});

carteApp.factory('API', function($http) {
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
});

carteApp.controller('MainCtrl', function ($scope, API) {
	$scope.title = "PDC8 - Carte"
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.idarbre = "";
    
    API.majPosition('http://rencontres-arbres.herokuapp.com/api/trees/AR17026/', 12.3, 15.4);
    //console.log("ajouter dans la base : "+latitude+','+longitude+','+identifiant);
});
