carteApp.service('API', function($http, $q) {
      return {
        username: 'arborphile',
        password: 'ilovetrees',
        baseURI: 'https://rencontres-arbres.herokuapp.com/api',
        getTrees: function() {
          var deferred = $q.defer();

          var url = this.baseURI + '/trees';
          (function getTreesPage(url) {
            var innerDeferred = $q.defer();
            $http.get(url).then(function(response) {
              var trees = response.data.results;
              //deferred.notify(trees);

              // Recurse for pagination
              if (response.data.next) {
                getTreesPage(response.data.next).then(function(newTrees) {
                  trees.push.apply(trees, newTrees);
                  innerDeferred.resolve(trees);
                }, function() { // recursive request error handling
                  innerDeferred.resolve(trees);
                });
              } else {
                innerDeferred.resolve(trees);
              }
            }, function() { // base request error handling
              innerDeferred.reject();
            });

            return innerDeferred.promise;
          }) (this.baseURI + '/trees').then(function(trees) {
            deferred.resolve(trees);
          });

          return deferred.promise;
        }, patchTree: function(id, data) {
          console.log("data " + data);
          var deferred = $q.defer();
          console.log(this.baseURI + '/trees/' + id + '/', data);
          $http.patch(this.baseURI + '/trees/' + id + '/', data, {
            headers: {
              'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
            }
          }).then(function(data) {
            deferred.resolve(data);
          }, function() {
            deferred.reject();
          });
          return deferred.promise;
        }
      };
    });