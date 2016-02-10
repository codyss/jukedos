'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  $scope.toggle = PlayerFactory.toggle;

  $scope.currentSong = PlayerFactory.getCurrentSong;

  $scope.playing = PlayerFactory.isPlaying;

  $scope.progress = PlayerFactory.getProgress;

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;

});
