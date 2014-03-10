Tiny.Model = new Tiny();

Tiny.Model.extend({
  records: [],
  newRecord: true,
  attributes: [],
  setAttributes: function () {
    this.attributes = tiny.Util.toArray(arguments);
    console.log(tiny.Util.toJson(this.attributes));
    this.parent.include(tiny.Util.toJson(this.attributes));
  },
  populate: function (values) {
    this.records = {};
    for (var i = 0, il = values.length; i < il; i++) {
      var record = values[i];
      record.newRecord = false;
      this.records[record.id] = record;
    }
  },
  init: function () {
    if (arguments.length) {
      var args = tiny.Util.toArray(arguments);
      this.parent.include(args.shift());
    }
  },
  getName: function () {
    for (var name in window)
      if (window[name] == this)
        return name;
  },
  attributes: function () {
    var result = {};
    for (var i in this.attributes) {
      var attr = this.attributes[i];
      result[attr] = this[attr];
    }
    result.id = this.id;
    return result;
  },
  find: function (id) {
    if (this.records[id])
      return this.records[id];
    else
      throw ("Unknown record");
  },
  create: function () {
    if (!this.id) this.id = tiny.Util.guid();
    this.newRecord = false;
    this.records[this.id] = this;
  },
  save: function () {
    this.newRecord ? this.create() : this.update();
  },
  update: function () {
    this.records[this.id] = this;
  },
  delete: function () {
    delete this.records[this.id];
  },
  saveRemote: function () {
    console.log("this is remote");
  },
  saveLocal: function (name) {
    name = name || this.getName();
    var result = [];
    for (var i in this.records)
      result.push(this.records[i])
    localStorage[name] = JSON.stringify(result);
    return this;
  },
  loadLocal: function (name) {
    var result = JSON.parse(localStorage[name]);
    this.populate(result);
  }
});