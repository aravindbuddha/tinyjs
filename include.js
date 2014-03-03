(function(win) {

  var api,
    doc = win.document,
    head = doc.getElementsByTagName('head')[0],
    api = {
      include: function(a, b) {
        this.load(a);
      },
      load: function(url) {
        if (this.isJs) {
          this.loadJs(url);
        }
      },
      loadJs: function(src) {
        var s = doc.createElement('script');
        s.type = 'text/' + (src.type || 'javascript');
        s.src = src;
        s.async = false;
        s.onreadystatechange = s.onload = function() {
          var state = s.readyState;
          if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
          }
        };
        (doc.body || head).appendChild(s);

        function callback() {
          alert('hi');
        }
      },
      isCss: function(url) {
        if (url.lastIndexOf('.css') > 0)
          return true;
        else
          return false
      },
      isJs: function(url) {
        if (url.lastIndexOf('.js') > 0)
          return true;
        else
          return false
      },
    };
  win.api = api;
}(window));