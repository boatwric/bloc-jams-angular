(function() {

  function seekBar($document) {

    /**COMMENT
    * @function calculatePercent
    * @desc CCalculates the horizontal percent along the seek bar where the event (passed in from the view as  $event) occurred
    * @param {Object} seekBar,event
    */

    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {

      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&' //The `&` binding type provides a way to execute an expression in the context of the parent scope
      },
      link: function(scope, element, attributes) { /*Directive link functions take the same arguments (with a strict order) during declaration. Altering the order of these arguments will cause errors.*/
        scope.value = 0;
        scope.max = 100;

        /**COMMENT
        *@desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it
        *@param {Object}
        */

        var seekBar = $(element);

        /**COMMENT
        * @function $observe
        * @desc determine the location of the seek bar thumb, and correspondingly, the playback position of the song
        * @type {Object}
        */

        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        });

        /**COMMENT
        * @function percentString
        * @desc Calculates what percentage bars are at on slider
        * @param {Object}
        */

        var percentString = function () {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /**COMMENT
        * @function fillStyle
        * @desc displays slider position
        * @type {Object}
        */

        scope.fillStyle = function() {
            return {width: percentString()};
         };

         /**COMMENT
         * @function thumbStyle
         * @desc compares thumb position against the left side of the slide bar
         * @type {Object}
         */

        scope.thumbStyle = function() {
          return {left: percentString()};
        };


        /**COMMENT
        * @function onClickSeekBar
        * @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar
        * @type {Object} event
        */

        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        /**COMMENT
        * @function trackThumb
        * @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of  scope.value as the user drags the seek bar thumb.
        * @type {Object}
        */

        scope.trackThumb = function() {

          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
            scope.value = percent * scope.max;
            notifyOnChange(scope.value);
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        /**COMMENT
        * @function notifyOnChange
        * @desc notify onChange that scope.value has changed
        * @type {Object}
        */

        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') { //We test to make sure that scope.onChange is a function. If a future developer fails to pass a function to the on-change attribute in the HTML, the next line will not be reached, and no error will be thrown.
            scope.onChange({value: newValue}); //We pass a full function call to the on-change attribute in the HTML –  scope.onChange() calls the function in the attribute.
            //The function we pass in the HTML has an argument, value, which isn't defined in the view (remember that it's not the same as scope.value). Using built-in Angular functionality, we specify the value of this argument using hash syntax. Effectively, we're telling Angular to insert the local newValue variable as the  value argument we pass into the SongPlayer.setCurrentTime() function called in the view.
          }
        };

      }

    };

  }

angular
  .module('blocJams')
  .directive('seekBar', ['$document', seekBar]);

})();
