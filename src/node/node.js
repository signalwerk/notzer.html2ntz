// Simple Node implementation of Nodes

class Node {
  constructor(name) {
    this._name = name;
  }

  data() {
    let data = {
      type: this._type
    };

    if (this._value) {
      data.value = this._value;
    }

    if (this._name) {
      data.name = this._name;
    }

    if (this._attributes && Object.keys(this._attributes).length) {
      data.attributes = this._attributes;
    }

    if (this._css && Object.keys(this._css).length) {
      data.css = this._css;
    }

    if (this._children && this._children.length) {
      data.children = this._children.map(item => item.data());
    }

    if (this._type === "root") {
      return data.children;
    }

    if (this._events && this._events.emit) {
      this._events.emit("data:end", this, data, newData => (data = newData));
    }

    return data;
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

module.exports = Node;
