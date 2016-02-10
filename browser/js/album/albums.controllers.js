juke.controller('Albums', function($scope, $http, SideBarFactory) {
  $http.get('/api/albums/')
  .then(res => res.data)
  .then(albums => {
    albums.forEach(function(album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
    });
    $scope.albums = albums
    
    // album.songs.forEach(function (song, i) {
    //   song.audioUrl = '/api/songs/' + song._id + '.audio';
    //   song.albumIndex = i;
    // });
  })

  $scope.showingAlbums = function () {
    return SideBarFactory.showingAlbums;
  }

  // $scope.showingAlbums = SideBarFactory.showingAlbums;
  $scope.selectAlbum = SideBarFactory.selectAlbum  

})