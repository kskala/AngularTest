/**
 * Created by ext96215 on 3.6.2015.
 */
var app;

app = angular.module('testAngularModule', ['ngResource', 'ngRoute']).
    factory('restService', ['$resource', function ($resource) {
        console.log(configData);

        var url = configData.isDevelopment ? configData.developmentURL : configData.productionURL;
        return $resource(url + 'persons/:id', {id:'@id'}, {
            query: {method: 'GET', isArray: true},
            get: {method: 'GET', params: 'id'}
        });
    }]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl:'list.html',
        controller:'mainController'
    }).when('/:id', {
        templateUrl:'detail.html',
        controller:'detailController'
    }).otherwise({
       redirectTo:'/'
    });
}]);

app.controller('mainController', ['$scope', 'restService', function($scope, restService) {
    $scope.loadPage = function() {
        $scope.persons = restService.query();
        console.log('RESULT: ' + $scope.persons);
    };

    $scope.loadPage();
}]);

app.controller('detailController', ['$scope', '$routeParams', 'restService', function($scope, $routeParams, restService) {
    restService.get({id:$routeParams.id}, function(data) {
        $scope.person = data;
        console.log('RESULT:' + $scope.person);
    });
}]);

