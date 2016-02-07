'use strict';

/**
 * @ngdoc function
 * @name headouthackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the headouthackApp
 */
angular.module('headouthackApp')
  .controller('MyTripsCtrl', function (TripService) {
    var self = this;
    self.myTrips = [];
    TripService.getMyTrips().then(function (response) {
      self.myTrips = response;
    })
    $('#example').timeline();
  });
