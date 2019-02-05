// var EventEmitter = require('events')

class Notzer {
  constructor(name) {
    this._name = name;
  }

  data() {
    let node = {
      type: this._type
    };

    if (this._value) {
      node.value = this._value;
    }

    if (this._name) {
      node.name = this._name;
    }

    if (this._attributes && Object.keys(this._attributes).length) {
      node.attributes = this._attributes;
    }

    if (this._css && Object.keys(this._css).length) {
      node.css = this._css;
    }

    if (this._children && this._children.length) {
      node.children = this._children.map(item => item.data());
    }

    if (this._type === "root") {
      return node.children;
    }

    if (this._events) {
      this._events.emit("data:end", this, node, newData => (node = newData));
    }

    return node;
  }

  events(value) {
    if (arguments.length === 0) {
      return this._events;
    }
    this._events = value;
    return this;
  }

  value(value) {
    if (arguments.length === 0) {
      return this._value;
    }
    this._value = value;
    return this;
  }

  name(value) {
    if (arguments.length === 0) {
      return this._name;
    }
    this._name = value;
    return this;
  }

  type(value) {
    if (arguments.length === 0) {
      return this._type;
    }
    this._type = value;
    return this;
  }

  attributes(value) {
    if (arguments.length === 0) {
      return this._attributes;
    }
    this._attributes = value;
    return this;
  }

  css(value) {
    if (arguments.length === 0) {
      return this._css;
    }
    this._css = value;
    return this;
  }

  children(value) {
    if (arguments.length === 0) {
      return this._children;
    }
    this._children = value;
    return this;
  }
}

module.exports = Notzer;
