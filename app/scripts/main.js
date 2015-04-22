/* jshint devel:true */
/* global google */
/* global skrollr */

function screensizeMediumOrBigger(){
  'use strict';
   return $('.innovate-tesla').css('position') === 'absolute';
}

function centerFrontpageCircle(){
  'use strict';
  $('.trends-circle').css({
    position:'absolute',
    left: ($(window).width() - $('.trends-circle').outerWidth())/2,
    top: ($(window).height() - $('.trends-circle').outerHeight())/2
  });
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

function resetTeslaImages() {
 'use strict';
  var images = $('img.innovate-tesla-innovation');

  $.each(images, function(i, img) {
    $(img).attr('style', '');
  });
}

function browserIsMobile(){
  'use strict';
   return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}

function initSkrollr(){
  'use strict';

  skrollr.init({
    render: function() {
      var teslaSlideOnScreen = $('#slide4').hasClass('skrollable-after'); 
      var teslaImagesAligned = $('#slide4').hasClass('tesla-images-aligned'); 
      if (teslaSlideOnScreen && screensizeMediumOrBigger() && !teslaImagesAligned) {
        alignTeslaImages();
        $('#slide4').addClass('tesla-images-aligned'); 
      }
    }
  });
}

function initializeGoogleMaps(){
  'use strict';

  var styles =
    [
        {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [
                {
                    'color': '#444444'
                }
            ]
        },
        {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#f2f2f2'
                }
            ]
        },
        {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
                {
                    'saturation': -100
                },
                {
                    'lightness': 45
                }
            ]
        },
        {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'simplified'
                }
            ]
        },
        {
            'featureType': 'road.arterial',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
                {
                    'visibility': 'off'
                }
            ]
        },
        {
            'featureType': 'transit.station.bus',
            'elementType': 'labels.icon',
            'stylers': [
                {
                    'saturation': '-16'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
                {
                    'color': '#04b7ff'
                },
                {
                    'visibility': 'on'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [
                {
                    'color': '#822582'
                }
            ]
        },
        {
            'featureType': 'water',
            'elementType': 'labels.text',
            'stylers': [
                {
                    'color': '#ffffff'
                },
                {
                    'weight': '0.01'
                }
            ]
        }
    ];

  var mapOptions = { 
    center: { lat: 51.5211246, lng: -0.0778594 },
    zoom: 12,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    disableDefaultUI: true,
    styles: styles 
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
  if (screensizeMediumOrBigger()) {
   alignTeslaImages();
  } else {
   resetTeslaImages();
  }
});

$( document ).ready(function() {
  'use strict';

  $('.slide').css('min-height', $(window).height());
  $('[data-toggle="tooltip"]').tooltip();

  $('.unboxed-header').fitText();

  centerFrontpageCircle();

  if(!browserIsMobile()){
    initSkrollr();
  }

  if (browserIsMobile() && screensizeMediumOrBigger()) {
   alignTeslaImages();
  }

  google.maps.event.addDomListener(window, 'load', initializeGoogleMaps);
});
