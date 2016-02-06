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
      .otherwise({
        redirectTo: '/'
      });
  });
