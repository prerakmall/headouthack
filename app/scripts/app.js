'use strict';

/**
 * @ngdoc overview
 * @name headouthackApp
 * @description
 * # headouthackApp
 *
 * Main module of the application.
 */
angular
  .module('headouthackApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'chart.js'
  ])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAnP8o7oxfYthhi6Nlxu8FQMBhm1qRxU0g',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'places'
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/trip/:id', {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl',
        controllerAs: 'trip'
      })
      .when('/my-trips', {
        templateUrl: 'views/my-trips.html',
        controller: 'MyTripsCtrl',
        controllerAs: 'myTrips'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
//  .run(['$rootScope', '$window', 'srvAuth', 
//    function($rootScope, $window, sAuth) {
//
//      $rootScope.user = {};
//
//      $window.fbAsyncInit = function() {
//        // Executed when the SDK is loaded
//        //
//        FB.init({ 
//
//          /* 
//             The app id of the web app;
//             To register a new app visit Facebook App Dashboard
//             ( https://developers.facebook.com/apps/ ) 
//             */
//
//          appId: '427241657475676', 
//
//          /* 
//             Adding a Channel File improves the performance 
//             of the javascript SDK, by addressing issues 
//             with cross-domain communication in certain browsers. 
//             */
//
//          channelUrl: 'app/channel.html', 
//
//          /* 
//             Set if you want to check the authentication status
//             at the start up of the app 
//             */
//
//          status: true, 
//
//          /* 
//             Enable cookies to allow the server to access 
//             the session 
//             */
//
//          cookie: true, 
//
//          /* Parse XFBML */
//
//          xfbml: true 
//        });
//
//        sAuth.watchAuthenticationStatusChange();
//
//      };
//
//      // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?
//
//      (function(d){
//        // load the Facebook javascript SDK
//
//        var js, 
//        id = 'facebook-jssdk', 
//        ref = d.getElementsByTagName('script')[0];
//
//      if (d.getElementById(id)) {
//        return;
//      }
//
//      js = d.createElement('script'); 
//      js.id = id; 
//      js.async = true;
//      js.src = "//connect.facebook.net/en_US/all.js";
//
//      ref.parentNode.insertBefore(js, ref);
//
//      }(document));
//
//    }]);
