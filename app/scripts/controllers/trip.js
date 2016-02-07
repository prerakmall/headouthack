'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
  .controller('TripCtrl', function (uiGmapIsReady, $routeParams) {
    var self = this;
    var map, getDirections;
    uiGmapIsReady.promise(1).then(function (instances) {
      map = instances[0].map;
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      getDirections = function (origin, destination) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        var start = origin.location;
        var end = destination.location;
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }
    });
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
    self.tripId = $routeParams.id;
    self.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    self.options = {styles: styles};
    self.pitstop = {
      name: '',
      type: 'Adventure',
      friends: '',
      location: '',
      startTime: (new Date()).toString()
    };
    self.journey = [];
    self.markers = [];
    self.tripTypeOptions = [
      {id: 1, name: 'Business'},
      {id: 2, name: 'Adventure'},
      {id: 1, name: 'Family'}
    ];

    self.searchEvents = {
      places_changed: function (searchBox) {
                        var place = searchBox.getPlaces()[0];
                        var lat = place.geometry.location.lat(), lng = place.geometry.location.lng();
                        self.map.center = {latitude: lat, longitude: lng};
                        self.pitstop.location = lat.toString() + ',' + lng.toString();
                        self.pitstop.address = place.formatted_address;
                        self.markers.push({
                          id: self.markers.length,
                          latitude: lat,
                          longitude: lng,
                          show: false,
                          address: place.formatted_address,
                          icon: 'http://www.nuoveterme.com/wp-content/uploads/free-map-marker-icon-blue.png'
                        });
                      }
    }

    self.showAddPointForm = function () {
      self.addPointFormShown = true;
    };

    self.addPitstop = function () {
      self.addPointFormShown = false;
      self.journey.push(self.pitstop);
      if (self.journey.length > 1) {
        getDirections(self.journey[self.journey.length-2], self.pitstop);
      }
      self.pitstop = { startTime: (new Date()).toString() };
    };

  });
