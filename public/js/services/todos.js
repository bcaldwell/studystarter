angular.module('todoService', [])

// super simple service
// each function returns a promise object 
.factory('Todos', ['$http', function ($http) {
    return {
        get: function (data) {
            if (data) {
                return $http.get('/api/todos?' + JSON.stringify(data));
            }
        },
        create: function (data) {
            return $http.post('/api/todos', data);
        },
        delete: function (id) {
            return $http.delete('/api/todos/' + id);
        }
    }
 }]);