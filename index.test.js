const chainMethods = require('./index');
const path = require('path');
const testObject = {
	add: (n1, n2) => n1 + n2,
	subtract: (n1, n2) => n1 - n2,
	operation(n1, n2, operationName) {
		return this[operationName](n1, n2);
	},
	number: 42,
	string: 'foo',
	null: null,
	object: {
		number: 4
	}
};


describe('chainMethods', () => {
	test('is a function', () => {
		expect(typeof chainMethods).toBe('function');
	});
	test('returns a function', () => {
		expect(typeof chainMethods(testObject)).toBe('function');
	});
	test('`value` property is the value passed to constructor', () => {
		const Calculator = chainMethods(testObject);
		const instance = new Calculator(20);
		expect(instance.value).toBe(20);
	});
	test('calling methods works', () => {
		const Calculator = chainMethods(testObject);
		const instance = new Calculator(20);
		expect(instance.add(6).value).toBe(26);
		expect(instance.subtract(6).value).toBe(14);
	});
	test('chaining methods works', () => {
		const Calculator = chainMethods(testObject);
		const instance = new Calculator(20);
		expect(instance.add(6).subtract(6).add(10).value).toBe(30);
	});
	test('context is correct for methods using `this`', () => {
		const Calculator = chainMethods(testObject);
		const instance = new Calculator(20);
		const value = instance.operation(6, 'add').operation(2, 'subtract').value;
		expect(value).toBe(24);
	});
	test('non-function properties are copied to prototype', () => {
		const Calculator = chainMethods(testObject);
		const instance = new Calculator(20);
		expect(instance.number).toBe(42);
		expect(instance.string).toBe('foo');
		expect(instance.null).toBe(null);
		expect(instance.object.number).toBe(4);
	});
	test('works with native node path functions', () => {
		const Path = chainMethods(path);
		expect(new Path('foo').join('bar', 'car').value).toBe('foo/bar/car');
		expect(new Path('foo').join('bar', '../car').join('test').value).toBe('foo/car/test');
	});
});
