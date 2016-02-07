'use strict';

/**
 * @ngdoc function
 * @name headouthackapp.controller:mainctrl
 * @description
 * # mainctrl
 * controller of the headouthackapp
 */
angular.module('headouthackApp')
  .service('User', function ($rootScope, $http) {
    var self = this;
    self.createUser = function () {
      return $http.post('http://localhost:8000/user', { name: 'MyAwesome Name', profile_url: 'fb.me/someurl', fb_userid: '123348347' });
    };
  });
