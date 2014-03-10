Tiny.Util = {
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  extend: function () {},
  addJsExt: function (url) {
    if (pkg.lastIndexOf('.js') === -1 && pkg.lastIndexOf('.css') === -1) {
      pkg = pkg + '.js';
    }
  },
  toArray: function (arg) {
    if (arg) return Array.prototype.slice.call(arg, 0)
    throw ("No argument supplied");
  },
  toJson: function (arr) {
    var obj = {};
    for (var i = 0, prop; prop = arr[i]; i++) {
      obj[prop] = "";
    };
    return obj;
  }
};