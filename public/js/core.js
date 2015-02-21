(function () {
    var app = angular.module('studystarter', ['todoController', 'todoService', 'angular.filter', 'ui.bootstrap', 'ui.router']);

    app.controller('makeStudy', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
        $scope.submit = function () {
            console.log($scope.form);
            Todos.create($scope.form)
                // if successful creation, call our get function to get all the new todos
                // clear the form so our user is ready to enter another

            .success(function (data) {
                console.log("send");
                $scope.form = {}; // clear the form so our user is ready to enter another
            });
            $scope.form = {};
        };
    }]);

    app.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/home.html',
                });

            $stateProvider
                .state('studies', {
                    url: '/studies',
                    templateUrl: 'templates/studies.html',

                });

            $stateProvider
                .state('make_study', {
                    url: '/make_study',
                    templateUrl: 'templates/make_study.html',
                    controller: 'makeStudy'
                });

            $stateProvider
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'templates/contact.html',
                });

            $stateProvider
                .state('study', {
                    url: "/study/{studyId}",
                    templateUrl: 'templates/study.html',
                    controller: function ($scope, $stateParams) {
                        $scope.test = $stateParams.studyId;
                    }
                })

            $urlRouterProvider.otherwise('home');
}]);
})();