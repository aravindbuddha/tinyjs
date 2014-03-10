window.Tiny = window.Tiny || {};

Tiny.Load = new Tiny.extend({
  init: function () {
    this.auto();
  },
  load: function (asserts) {
    for (var i = 0, a; a = asserts[i]; i++) {
      if (pkg.lastIndexOf('.css') > 0) {
        this.loadCss(a);
      } else {
        a = this.addJsExt(a);
        this.loadJs(a);
      }
    };
  },
  auto: function () {
    var pkg, script = document.scripts;
    for (var i = 0, s; s = script[i]; i++) {
      if (s.hasAttribute('tiny-data')) {
        pkg = s.getAttribute('tiny-data');
      }
    };
    if (pkg.lastIndexOf('.js') === -1 && pkg.lastIndexOf('.css') === -1) {
      pkg = pkg + '.js';
    }
    this.loadJs(pkg);
  },
  loadJs: function (url, callback) {
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.async = false;

    if (s.readyState) { //IE
      s.onreadystatechange = function () {
        if (s.readyState == "loaded" ||
          s.readyState == "complete") {
          s.onreadystatechange = null;
          callback ? callback() : '';

        }
      };
    } else { //Others
      s.onload = function () {
        callback ? callback() : "";
        alert('alert');
      };
    }
    s.src = url;
    document.head = document.head || document.getElementsByTagName("head")[0];

    function add(s) {
      document.head.appendChild(s);
    }
  },
  loadCss: function (url) {
    var l = document.createElement('link');
    l.type = "text/css";
    l.rel = "stylesheet";
    l.href = url;
    if (document.links.length) {
      document.links[document.links.length - 1].appendChild(l);
    } else {
      document.head = document.head || document.getElementsByTagName("head")[0];
      document.head.appendChild(s);
    }
  },
  addJsExt: function (url) {
    if (url.lastIndexOf('.js') === -1 && url.lastIndexOf('.css') === -1) {
      return url = url + '.js';
    } else {
      return url;
    }
  },
  domReady: function (callback) {
    var win = window,
      doc = window.document;

    function ready() {
      callback();
      return;
    }
    if (doc.addEventListener) {
      doc.addEventListener("DOMContentLoaded", ready, false)
    } else if (win.attachEvent) {
      /in/.test(document.readyState) ? setTimeout('this.domReady(' + ready + ')', 9) : ready();
    }
  },
  ajax: function (_config) {
    _config.method = _config.method || 'GET';
    _config.asyc = _config.asyc || true;
    if (!_config.url)
      throw "Ajax end point must";
    var xhr = new XMLHttpRequest();
    xhr.open(_config.method, _config.url, _cofig.asyc);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        _cofig.callback(JSON.parse(this.responseText));
      }
    };
    xhr.send();
  },
  get: function (url, callback) {
    this.ajax({
      method: 'GET',
      callback: callback
    });
  },
  post: function (url, data, callback) {
    this.ajax({
      method: 'POST',
      callback: callback
    });
  },
  put: function () {
    this.ajax({
      method: 'PUT',
      callback: callback
    });
  },
  distroy: function () {
    this.ajax({
      method: 'DELETE',
      callback: callback
    });
  }
});

Tiny.load = new Tiny.Load();