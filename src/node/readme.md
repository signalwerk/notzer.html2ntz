# Node
This is a simple implementation of a node to represent trees like in HTML.


## Constructor(*string*)
Create a node with an optional tag name.

```js
let node = new Node();

// or
let node = new Node("span");
```

## value(*string*)
The value represents in HTML the text of the node.

Setter for tag value;
```js
node.value("Text");
```

Getter for tag value;
```js
node.value();
```


## name(*string*)
Setter for tag name;
```js
node.name("span");
```

Getter for tag name;
```js
node.name();
```


## type(*string*)
In html you have the type `text` for text nodes and `element` for element nodes.

Setter for type;
```js
node.type("element");
```

Getter for type;
```js
node.type();
```

## attributes(*Object*)
Setter for attributes;
```js
node.attributes({
  id: "test",
  class: "hello"
});
```

Getter for attributes;
```js
node.attributes();
```

## css(*Object*)
This is the `styles` attribute of a html node put in an object representation.

Setter for css;
```js
node.css({
  left: "15px",
  top: "1rem"
});
```

Getter for css;
```js
node.css();
```


## children(*[node, ...]*)

Setter for children;
```js
// create Text
let txt = (new Node()).type("text").value("Test");
// append Text to node
node.children([txt]);
```

Getter for children;
```js
node.children();
```



## data()
The data function returns a plain object representation of the data.

```js
// create H1
let h1 = new Node("h1");
h1.type("element");

// create Text
let txt = new Node();
txt.type("text");
txt.value("Test");

// add Text to H1
h1.children([txt]);

// now we can get a data representation
h1.data();

```


returns

```js

{
  type: "element",
  name: "h1",
  children: [
    {
      type: "text",
      value: "Test"
    }
  ]
}

```


## events(*EventEmitter*)
There are some events emitted on certain sections. The `EventEmitter` needs to implement a function called `emit`. Events can be registered as follow:

```js
// register all events
let events = new EventEmitter();
// ...
node.events(events);
```

Access to the registered events.

```js
node.events() // get all registered events
```

## Event-Types

### "data:end", (node, data, callbak)
This event is fired at the end of `node.data()`. The Event gets the current node, the plain data object that `node.data()` created so far and a callback to set the new return value.

```js
let events = new EventEmitter();
this.events.on("data:end", (node, data, setData) => {
  data.testValue = "test";
  setData(data);
});
node.events(events);
node.data(); // get the plain object with the new key `testValue`
```
