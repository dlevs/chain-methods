'use strict';

function chainMethods(source) {
	function ChainedMethods(value) {
		this.value = value;
	}

	for (var key in source) {
		var value = source[key];

		if (typeof value === 'function') {

			ChainedMethods.prototype[key] = function () {
				var args = Array.prototype.slice.call(arguments);
				var result = value.apply(source, [this.value].concat(args));
				return new ChainedMethods(result);
			}

		} else {

			ChainedMethods.prototype[key] = value;

		}
	}

	return ChainedMethods;
}

module.exports = chainMethods;
