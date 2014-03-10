window.Tiny = window.Tiny || {};
Tiny = function (obj) {
  var tiny = function () {
    this.init.apply(this, arguments);
  };
  tiny.prototype.init = function () {};
  // Shortcut to access prototype
  tiny.fn = tiny.prototype;
  // Shortcut to access class
  tiny.fn.parent = tiny;
  // Adding class properties
  if ( !! obj) {
    for (var i in obj) {
      tiny.fn[i] = obj[i];
    }
  }
  tiny.extend = function (obj) {
    var extended = obj.extended;
    for (var i in obj) {
      tiny.fn[i] = obj[i];
    }
    if (extended) extended(tiny)
  };
  // Adding instance properties
  tiny.static = function (obj) {
    for (var i in obj) {
      tiny[i] = obj[i];
    }
  };
  return tiny;
};

Tiny.extend = Tiny;