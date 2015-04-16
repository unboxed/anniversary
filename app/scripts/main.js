/* jshint devel:true */
/* global google */
/* global skrollr */

function centerFrontpageCircle(){
  'use strict';
  $('.trends-circle').css({
    position:'absolute',
    left: ($(window).width() - $('.trends-circle').outerWidth())/2,
    top: ($(window).height() - $('.trends-circle').outerHeight())/2
  });
}

function formatFrontpage(){
  'use strict';
  $('.trends-title').fitText(1.1);
  $('.slide').css('min-height', $(window).height());
  centerFrontpageCircle();
}

function toRadians (angle) {
  'use strict';
    return angle * (Math.PI / 180);
}

function alignTeslaImages(){
  'use strict';
  var surroundingCircle = $('.tesla-portrait-surrounding-circle');
  var offset = surroundingCircle.offset();

  var width = surroundingCircle.width();
  var height = surroundingCircle.height();
  var r = width / 2.0;

  var centerX = offset.left + width / 2.0;
  var centerY = offset.top + height / 2.0;
  
  var firstImageStartInDegrees = 200.0; 
  var angleDifferenceInDegrees = 30.0;

  var images = $('img.innovate-tesla-innovation');

  $.each(images, function(i, img) {
    var imgWidth = $(img).width();
    var imgHeight = $(img).height();
    var x = r * Math.sin(toRadians(firstImageStartInDegrees - i * angleDifferenceInDegrees));
    var y = r * Math.cos(toRadians(firstImageStartInDegrees - i * angleDifferenceInDegrees));
    $(img).offset({top: centerY - (imgWidth / 2.0) + x, left: centerX + (y) - (imgHeight / 2.0) });
  });
  
}

function initSkrollr(){
  'use strict';
  if((/Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    return;
  }
  skrollr.init({
    render: function() {
      var teslaSlideOnScreen = $('#slide4').hasClass('skrollable-after'); 
      var teslaImagesAligned = $('#slide4').hasClass('tesla-images-aligned'); 
      var screenSizeMediumOrBigger = $('.innovate-tesla').css('position') === 'absolute';
      if (teslaSlideOnScreen && screenSizeMediumOrBigger && !teslaImagesAligned) {
        alignTeslaImages();
        $('#slide4').addClass('tesla-images-aligned'); 
      }
    }
  });
}

function initializeGoogleMaps(){
  'use strict';
  var mapOptions = { 
    center: { lat: 51.5211246, lng: -0.0778594 },
    zoom: 12,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    disableDefaultUI: true 
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }
}

$(window).resize(function(){
  'use strict';
  $('.slide').css('min-height', $(window).height());
  centerFrontpageCircle();
});

$( document ).ready(function() {
  'use strict';
  formatFrontpage(); 
  $('[data-toggle="tooltip"]').tooltip();
  initSkrollr();
});

google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);

