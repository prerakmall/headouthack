'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
.controller('TripCtrl', function (TripService, uiGmapIsReady, $routeParams, $location, fileUpload) {
    var self = this;
    var map, getDirections;
    uiGmapIsReady.promise(1).then(function (instances) {
      map = instances[0].map;
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      getDirections = function () {
        directionsDisplay = new google.maps.DirectionsRenderer({
          infoWindow: new google.maps.InfoWindow({
            content: "This is custom content",
            position: self.journey[0].location
          })
        });
        directionsDisplay.setMap(map);
        var start = self.journey[0].location;
        var end = self.journey[self.journey.length - 1].location;
        var waypoints = [];
        for (var i = 1; i < self.journey.length - 1; i++) {
          waypoints.push({
            location: self.journey[i].location,
            stopover: true
          })
        }
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: waypoints
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
    self.checkpoint= {
      image: '',
      text: '',
      location: '',
      timestamp: (new Date()).toString()
    };
    self.endtrip= {
      tripid: self.tripId,
      privacy: false,
      rating: 0,
      end_location: '',
      end_timestamp: (new Date()).toString()
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
                        self.checkpoint.location = lat.toString() + ',' + lng.toString();
                        self.endtrip.end_location = lat.toString() + ',' + lng.toString();
                        self.pitstop.address = place.formatted_address;
                        self.markers.push({
                          id: self.markers.length,
                          latitude: lat,
                          longitude: lng,
                          show: false,
                          address: place.formatted_address,
                          icon: ''
                        });
                      }
    }

    self.showAddPointForm = function () {
      self.addPointFormShown = true;
    };
    self.showCheckpointForm = function () {
      self.addCheckpointFormShow = true;
    };
    self.endTripShowForm = function () {
      self.addEndTripFormShow = true;
    };

    self.addPitstop = function () {
      self.addPointFormShown = false;
      self.journey.push(self.pitstop);
      if (self.journey.length > 1) {
        self.markers = [];
        getDirections();
      }
      TripService.createNewTrip(self.pitstop).then(function (response) {
        self.tripId = response.data.tripid;
      })
      self.pitstop = { startTime: (new Date()).toString() };
    };

    self.addCheckpoint = function () {
      self.journey.push(self.checkpoint);
      fileUpload.uploadFileToUrl(self.checkpoint.image, self.checkpoint, self.tripId).then(function (response) { 
        console.log(response); // TODO: image_url being returned here
        self.journey[self.journey.length -1].image = response.data.image;
        if (self.journey.length > 1) {
          self.markers = [];
          getDirections();
        }
        self.addCheckpointFormShow = false;
      });
    }
    self.endTrip = function () {
      TripService.endTrip(self.endtrip).then(function (response) { 
        console.log(response); // TODO: whole journey being returned
        self.endTripFormShow = false;
        self.markers = [];
      });
    }
    self.moveToPitstop = function (pitstop) {
      var lat = pitstop.location.split(',')[0],
          lng = pitstop.location.split(',')[1];
      self.map.center = {latitude: lat, longitude: lng}
      self.map.zoom = 16;
    };
  });
