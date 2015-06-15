/**
 * Created by ext96215 on 3.6.2015.
 */
var app;

app = angular.module('testAngularModule', ['ngResource']).
    factory('restService', ['$resource', function ($resource) {
        console.log(configData);

        var url = configData.isDevelopment ? configData.developmentURL : configData.productionURL;
        return $resource(url + 'persons/:id', {id:'@id'}, {
            query: {method: 'GET'},
            get: {method: 'GET', params: 'id'}
        });
    }]);

app.controller('mainController', ['$scope', 'restService', function($scope, restService) {
    $scope.selectedId = 0;
    $scope.loadPage = function() {
        $scope.persons = restService.query();
        console.log('RESULT: ' + $scope.persons);
    }

    $scope.loadPage();
}]);

angular.module('testAngularDetailModule', ['testAngularModule', 'ngResource']).controller('detailController',
    ['$scope', 'restService', function($scope, restService) {
    restService.get($scope.selectedId, function(data) {
        $scope.person = data;
        console.log('RESULT:' + $scope.person);
    });
}]);