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
    return node;
  }

  get value() {
    return this._value;
  }

  value(value) {
    this._value = value;
    return this;
  }

  get name() {
    return this._name;
  }

  name(value) {
    this._name = value;
    return this;
  }

  get type() {
    return this._type;
  }

  type(value) {
    this._type = value;
    return this;
  }

  get attributes() {
    return this._attributes;
  }

  attributes(value) {
    this._attributes = value;
    return this;
  }

  get css() {
    return this._css;
  }

  css(value) {
    this._css = value;
    return this;
  }

  get children() {
    return this._children;
  }

  children(value) {
    this._children = value;
    return this;
  }
}

module.exports = Notzer;
