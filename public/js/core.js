(function () {
    var app = angular.module('studystarter', ['todoController', 'todoService', 'angular.filter', 'ui.bootstrap', 'ui.router']);

    app.factory('Page', function () {
        var title = 'home';
        return {
            title: function () {
                return title;
            },
            setTitle: function (newTitle) {
                console.log(newTitle);
                title = newTitle;
            }
        };
    });

    app.controller('makeStudy', ['$scope', '$http', 'Todos', 'Page', function ($scope, $http, Todos, page) {
        page.setTitle('make');
        $scope.submit = function () {
            console.log($scope.form);
            Todos.create($scope.form)
                // if successful creation, call our get function to get all the new todos
                // clear the form so our user is ready to enter another

//            .success(function (data) {
            //                console.log("send");
            //                $scope.form = {}; // clear the form so our user is ready to enter another
            //            });
            $scope.form = {};
        };
    }]);

    app.controller('homeContoller', ['$http', 'Todos', 'Page', function ($http, Todos, page) {
        page.setTitle('home');
        Todos.get({
                rank: 6
            })
            //        .success(function (data) {
            //            console.log(data);
            //        });
    }]);

    app.controller('studyContoller', ['Page', function (page) {
        page.setTitle('study');
    }]);

    app.controller('contactContoller', ['Page', function (page) {
        page.setTitle('contact');
    }]);

    app.controller('navController', ['Page', function (page) {
        this.active = function (title) {
            if (title === page.title()) {
                return 'active';
            }
            return null;
        }

    }]);

    app.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'templates/home.html',
                    controller: 'homeContoller'
                });

            $stateProvider
                .state('studies', {
                    url: '/studies',
                    templateUrl: 'templates/studies.html',
                    controller: 'studyContoller'
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
                    controller: 'contactContoller'
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