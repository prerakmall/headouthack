'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
  .controller('TripCtrl', function (TripService, $routeParams) {
    var self = this;
    var styles = [
      {
        stylers: [
          { hue: "#00ffe6" },
          { saturation: -20 }
        ]
      },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
      },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
      }
    ];
    self.markers = [];

    self.searchEvents = {
      places_changed: function (searchBox) {
                        console.log(searchBox);
                      }
    }

    self.showAddPointForm = function () {
      var lat, lng;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          self.map.center = { latitude: lat, longitude: lng };
          self.markers.push({ latitude: lat, longitude: lng, id: self.markers.length });
        });
      } else {
        console.log('failed here');
      }
      console.log(lat, lng);
    };

    self.tripId = $routeParams.id;
    self.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    self.options = {styles: styles};
    self.pitstop = {};
  });
