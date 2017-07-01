(function() {
  function SongPlayer($rootScope, Fixtures) {

    /**
    *@desc Empty object you throw all your crap into
    *@param {Object}
    */

    var SongPlayer = {};

    /**
    *@desc Album object
    *@param {Object}
    */

    var currentAlbum = Fixtures.getAlbum();

    /**
    *@desc Audio file
    *@param {Object}
    */

    var currentBuzzObject = null;

    /**
    *@function playSong
    *@desc Plays currentBuzzObject, sets true to song.playing method
    *@param {Object} song
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */

    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }

      /**
      * @desc Buzz object audio file
      * @type {Object}
      */

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      /**
      * @desc CUSTOM EVENT starts "applying" the time update once we know which song to play
      * @type {Object}
      */

      currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
          });
      });

      SongPlayer.currentSong = song;

    };

    /**
    * @function getSongIndex
    * @desc Gets index of song
    * @param {Object} song
    */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @function stopSong
    * @desc Stops song, sets playing property to null
    * @param {Object} song
    */

    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    *@desc Active song from list
    *@param {Object}
    */

    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */

    SongPlayer.currentTime = null;

    /**
    * @desc Current volume
    * @type {Number}
    */

    SongPlayer.volume = 30;

    /**
    * @function play
    * @desc Plays a song
    * @type {Object}
    */

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /**
    * @function pause
    * @desc Pauses the song
    * @type {Object} song
    */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc Goes to index - 1
    * @type {Object}
    */

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function next
    * @desc Goes to index + 1
    * @type {Object}
    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex > currentAlbum.songs.length - 1) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    };

    return SongPlayer;

  }

angular
  .module('blocJams')
  .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();
