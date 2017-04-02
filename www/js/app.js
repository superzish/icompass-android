// Ionic iComPAsS App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'iComPAsS' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'iComPAsS.controllers' is found in controllers.js
// 'iComPAsS.sevices' is found in services.js
angular.module('iComPAsS', ['ionic', 'chart.js', 'rzModule', 'ngSanitize', 'iComPAsS.constants', 'iComPAsS.config', 'iComPAsS.services', 'iComPAsS.controllers'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var notificationOpenedCallback = function(jsonData) {
      var alertPopup = $ionicPopup.alert({
        title: 'Notification Opened',
        template: JSON.stringify(jsonData),
        cssClass: 'alert-popup'
      });
      alert("Notification opened:\n" + JSON.stringify(jsonData));
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    //onsignal notification
    if (window.plugins && window.plugins.OneSignal) {
      window.plugins.OneSignal
      .startInit("b09fe4d1-bb2c-4f16-bcdb-4f47d2e0298f")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    }

    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }

  });

});
