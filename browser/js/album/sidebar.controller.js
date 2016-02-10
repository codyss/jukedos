juke.controller('sidebar', function ($scope, $rootScope, SideBarFactory) {


  $scope.viewAlbums = function (album) {
    SideBarFactory.changeView();
  };

})