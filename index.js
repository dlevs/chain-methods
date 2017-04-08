'use strict';

function chainMethods(source) {
	function ChainedMethods(value) {
		this.value = value;
	}

	function proxy(fn) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			var result = fn.apply(source, [this.value].concat(args));
			return new ChainedMethods(result);
		}
	}

	for (var key in source) {

		if (typeof source[key] === 'function') {

			ChainedMethods.prototype[key] = proxy(source[key])

		} else {

			ChainedMethods.prototype[key] = source[key];

		}
	}

	return ChainedMethods;
}

module.exports = chainMethods;
