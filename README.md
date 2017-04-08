# Chain Methods
This module exposes a single function to transform a plain object into a class,
where methods can be chained.

## Installation
`npm install chain-methods`

## Usage
```javascript
const chainMethods = require('chain-methods');
const Path = chainMethods(require('path'));

const rootPath = new Path(__dirname);
const imagesPath = rootPath.join('dist/static/images');

// With `chainMethods`:
const stream = fs.createReadStream(imagesPath.join('foo.jpg').value);
```

## Why
This module was created for experimentation purposes. It works well for APIs
like node's path and url modules, where the first argument of each function is
consistent.

It makes code a little easier to read by avoiding this type of nesting:
```javascript
const foo = obj.method1(obj.method2('bar'), 'baz');
```

## Limitations
The first argument of each method must be consistent.

```javascript
const Calculator = chainMethods({
    // Good:
    add: (n1, n2) => n1 + n2,
    subtract: (n1, n2) => n1 - n2,
    
    // Bad:
    operation(operationName, ...args) {
        return this[operationName](...args);
    },
});
const value = new Calculator(0)
    .add(10)
    .subtract(2)
    
    // This line won't work because of the argument order of `operation`:
    .operation('add', 20)
    
    .value;
```

In the example above, the first argument of `operation` is not the number being
operated on. It is inconsistent with `add` and `subtract`, so will not work in
chaining.
