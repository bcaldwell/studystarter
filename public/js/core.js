(function () {
    var app = angular.module('studystarter', ['todoController', 'todoService', 'angular.filter', 'ui.bootstrap', 'ui.router']);

    app.controller('mainController', function () {
        this.hello = "boo";
    })

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