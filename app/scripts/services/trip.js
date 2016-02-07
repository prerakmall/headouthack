'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
  .service('TripService', function ($rootScope, $http) {
    var self = this;
    self.createNewTrip = function (pitstop) {
      return $http.post('http://localhost:8000/trip', {
        userid: $rootScope.currentUser.userid.toString(),
        trip_type: pitstop.type.name,
        trip_friends: pitstop.friends,
        vehicle: 'car',
        start_location: pitstop.location,
        start_timestamp: pitstop.startTime
      })
    }
    self.addCheckpoint = function (checkpoint, tripId) {
      checkpoint.tripid = tripId;
      return $http.post('http://localhost:8000/pitstop', checkpoint, {
        headers: {
         'Content-Type': 'multipart/form-data; charset=utf-8'
        }
      })
    }
    self.endTrip = function (endtrip, tripId) {

      return $http.put('http://localhost:8000/trip', endtrip)
    }
    self.getMyTrips = function () {
      return $http.get('http://localhost:8000/trips', {userid: $rootScope.currentUser.userid});
    }
  });
