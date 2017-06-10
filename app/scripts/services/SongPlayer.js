(function() {
          function SongPlayer() {

            /**
            *@desc Empty object you throw all your crap into
            *@param {Object}
            */

              var SongPlayer = {};

              /**
              *@desc Currently song
              *@param {Object}
              */

              var currentSong = null;

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
                      currentBuzzObject.stop();
                      currentSong.playing = null;
                  }

                  /**
                  * @desc Buzz object audio file
                  * @type {Object}
                  */
                  currentBuzzObject = new buzz.sound(song.audioUrl, {
                      formats: ['mp3'],
                      preload: true
                  });

                  currentSong = song;
               };

               /**
               * @function
               * @desc Plays a song
               * @type {Object}
               */

              SongPlayer.play = function(song) {
                  if (currentSong !== song) {
                    setSong(song);
                    playSong(song);
          }
        };

        /**
        * @function
        * @desc Pauses the song
        * @type {Object}
        */
              SongPlayer.pause = function(song) {
                currentBuzzObject.pause();
                song.playing = false;
              };

          return SongPlayer;
      }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
