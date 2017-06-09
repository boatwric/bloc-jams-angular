(function() {
  function AlbumCtrl(Fixtures, SongPlayer) {
       this.albumData = {};
       this.albumData= Fixtures.getAlbum();
       this.songPlayer = SongPlayer;
        }


     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();


/*
Create a controller for the Album view. YUP
Link to the AlbumCtrl.js script source in index.html. YUP
Add an albumData property that holds a copy of albumPicasso. YUP
Use ngRepeat on the album-view-song-item table row to add a song row for each song on the album. YUP
Replace the static song information with the song data using the corresponding scope properties and {{ }} markup:
number (Refer to the table of "exposed properties" in the ngRepeat documentation)
name YUP
length (You'll filter the time code in a later checkpoint) YUP
In the Album template, replace the static album information with the album data using {{ }} markup:
album art YUP
name YUP
artist YUP
year and record label YUP
*/
