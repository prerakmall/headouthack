'use strict';
angular.module('headouthackApp').service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, checkpoint, tripid){
        var fd = new FormData();
        fd.append('image', file);
        fd.append('text', checkpoint.text);
        fd.append('timestamp', checkpoint.timestamp);
        fd.append('location', checkpoint.location);
        fd.append('tripid', tripid);

        return $http.post('http://localhost:8000/pitstop', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    }
}]);