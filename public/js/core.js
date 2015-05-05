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

    app.controller('makeStudy', ['$scope', '$http', 'Todos', 'Page', '$window', function ($scope, $http, Todos, page, $window) {
        page.setTitle('make');
        $scope.submit = function () {
            console.log($scope.form);
            Todos.create($scope.form);
            $window.location.href = "/";
            $scope.form = {};
        };
    }]);

    app.controller('homeContoller', ['$http', 'Todos', 'Page', function ($http, Todos, page) {
        page.setTitle('home');
        var that = this;
        Todos.get("rank=6")
            .success(function (data) {
                that.studies = data;
            });
    }]);

    app.controller('studyContoller', ['$http', 'Todos', 'Page', function ($http, Todos, page) {
        page.setTitle('study');
        this.form = {};
        this.form.area = "studyName";
        Todos.get("rank=1000")
            .success(function (data) {
                that.studies = data;
            });
        var that = this;
        this.submit = function () {
            Todos.get("key=" + that.form.area + "&value=" + that.form.searchInput)
                .success(function (data) {
                    that.studies = data;
                });
        };
    }]);

    app.controller('contactContoller', ['Page', function (page) {
        page.setTitle('contact');
    }]);

    app.controller('loginContoller', ['Page', function (page) {
        page.setTitle('NaN');
    }]);

    app.controller('studyViewContoller', ['$stateParams', 'Page', '$http', 'Todos', '$window', function ($stateParams, page, $http, Todos, $window) {
        page.setTitle('NaN');
        this.id = $stateParams.studyId;
        var that = this;
        Todos.get("_id=" + this.id)
            .success(function (data) {
                that.data = data[0];
                console.log(that.data);
            });
        this.sendEmail = function () {
            console.log("tis be clicked");
            Todos.get("sendEmail=true&_id=" + this.id)
            $window.location.href = "/";
        }
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
                    controller: 'homeContoller',
                    controllerAs: 'home'
                });

            $stateProvider
                .state('studies', {
                    url: '/studies',
                    templateUrl: 'templates/studies.html',
                    controller: 'studyContoller',
                    controllerAs: 'study'
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
                    controller: 'studyViewContoller',
                    controllerAs: 'study'
                });
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: 'templates/login.html',
                    controller: 'loginViewContoller',
                    controllerAs: 'login'
                })

            $urlRouterProvider.otherwise('home');
}]);


})();