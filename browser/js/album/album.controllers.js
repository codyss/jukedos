'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory, SideBarFactory) {

  // $scope.album = SideBarFactory.giveMeAlbum()

  $scope.$on('selectAlbum', function(event, album) {
    $http.get('/api/albums/'+album._id)
    .then(function(album){
      // console.log(album)
      album.data.imageUrl = '/api/albums/' + album.data._id + '.image';
      album.data.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
        song.albumIndex = i;
      })
      return album.data
    }).then(function (album) {
      console.log(album);
      $scope.album = album;
    })
  })
  

  $scope.toggle = function (song) {
    if (PlayerFactory.playing && song === PlayerFactory.currentSong) {
      PlayerFactory.pause()
    } else PlayerFactory.start(song, $scope.album.songs);
  };

  // incoming events (from Player, toggle, or skip)
  // PlayerFactory.$on('pause', pause);

  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.showAlbum = function () {
    return !SideBarFactory.showingAlbums;
  }

  // PlayerFactory.$on('play', play);
  // PlayerFactory.$on('next', next);
  // PlayerFactory.$on('prev', prev);
});

juke.factory('StatsFactory', function ($q) {
    var statsObj = {};
    statsObj.totalTime = function (album) {
        var audio = document.createElement('audio');
        return $q(function (resolve, reject) {
            var sum = 0;
            var n = 0;
            function resolveOrRecur () {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function () {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    return statsObj;
});
