juke.factory('SideBarFactory', function (StatsFactory, $rootScope) {
  var bar = {};

  bar.showingAlbums = true;

  bar.changeView = function () {
    console.log('view should change', bar.showingAlbums);
    bar.showingAlbums = !bar.showingAlbums;
    console.log('view should change', bar.showingAlbums);
    $rootScope.$broadcast('selectAlbum', bar.giveMeAlbum());
  }


  bar.selectAlbum = function (album) {
    console.log(album);
    bar.selectedAlbum = album;
    bar.changeView();
    bar.linkSongs();
  }

  bar.giveMeAlbum = function () {
    return bar.selectedAlbum;
  }

  // load our initial data
  bar.linkSongs = function () {
    bar.selectedAlbum.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    })
  }
  
  bar.addTime = function () {
    StatsFactory.totalTime(album).then(function(duration) {
      var min = Math.floor(duration/60);
      var sec = Math.floor((duration/60 - min)*60);
      bar.fullDuration = min + "." + sec
    });
  }
  

  return bar;
})