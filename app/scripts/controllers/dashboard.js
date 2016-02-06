'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
  .controller('DashboardCtrl', function () {
    var self = this;
    self.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    self.series = ['Series A', 'Series B'];
    self.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  });
