'use strict';

juke.controller('AlbumCtrl', function(PlayerFactory, $http, $rootScope, $log, StatsFactory, PlayerFactory) {
  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    PlayerFactory.album = album;
    StatsFactory.totalTime(album).then(function(duration) {
      PlayerFactory.fullDuration = albumDuration;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.playing && song === PlayerFactory.currentSong) {
      PlayerFactory.pause()
    } else PlayerFactory.start(song, PlayerFactory.album.songs);
  };

  // incoming events (from Player, toggle, or skip)
  // PlayerFactory.$on('pause', pause);

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.prev;

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
