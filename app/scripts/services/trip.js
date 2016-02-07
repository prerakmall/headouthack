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
      return $http.post('/trip', {
        user_id: $rootScope.currentUser.userid,
        trip_type: pitstop.type,
        trip_friends: pitstop.friends,
        vehicle: 'car',
        start_location: pitstop.location,
        start_timestamp: pitstop.startTime
      })
    }
    self.addCheckpoint = function (checkpoint, tripId) {
      checkpoint.tripid = tripId;
      return $http.post('/pitstop', checkpoint)
    }
    self.endTrip = function (endtrip, tripId) {

      return $http.put('/trip', endtrip)
    }
    self.getMyTrips = function () {
      return $http.get('/trips', {userid: $rootScope.currentUser.user_id});
    }
  });
