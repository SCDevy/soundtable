var UI = (function () {
  my.notification = function(message) {
    document.getElementById(notification).innerHTML(message);
    console.log("Notification: " + message);
  };
}());
