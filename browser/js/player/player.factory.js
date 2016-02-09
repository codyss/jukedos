'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var playa = {};

  playa.audio = document.createElement('audio');

  // state
  playa.currentSong = playa.currentSong || null;
  playa.playing = false;
  playa.album;
  

  playa.toggle = function (song) {
    if (playa.playing) playa.pause();
    else playa.start(song);
  };

    // functionality
  playa.pause = function () {
    playa.audio.pause();
    playa.playing = false;
  }
  
  playa.resume = function(){
    playa.audio.play();
    playa.playing = true
  }

  playa.start = function (song, playList){
    // stop existing audio (e.g. other song) in any case
    playa.playList = playa.playList || playList;
    playa.pause();
    // resume current song
    if (song === playa.currentSong) playa.resume()
    // enable loading new song
    playa.currentSong = song;
    playa.audio.src = song.audioUrl;
    playa.audio.load();
    playa.audio.play();
    playa.playing = true;
  }

  playa.getCurrentSong = function () {
    return playa.currentSong;
  }

  playa.isPlaying = function(){return playa.playing}

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  playa.skip = function (interval) {
    if (!playa.currentSong) return;
    var index;
    playa.playList.forEach(function(song, i) {
      if (song.audioUrl === playa.currentSong.audioUrl) {
        index = i;
      }
    })
    index = mod( (index + (interval || 1)), playa.playList.length );
    playa.currentSong = playa.playList[index];
    if (playa.playing) playa.start(playa.currentSong);
  };
  playa.next= function () { playa.skip(1); };
  playa.previous = function () { playa.skip(-1); };

  playa.getProgress = function () {
    if (playa.currentSong) {
      playa.progress = playa.audio.currentTime / playa.audio.duration;
    } else {
      playa.progress = 0;
    }
    return playa.progress;
  }

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  playa.audio.addEventListener('ended', playa.next);
  // playa.audio.addEventListener('timeupdate', function () {
    // playa.progress = 100 * playa.audio.currentTime / playa.audio.duration;
    // playa.$digest(); // no Angular-aware code is doing this for us here
  // });

  return playa;

});
