'use strict';

module.exports = array => {
	if (!Array.isArray(array)) {
		throw new TypeError('Expected an array');
	}

	return new Proxy(array, {
		get(target, name, receiver) {
			if (typeof name !== 'string') {
				return Reflect.get(target, name, receiver);
			}

			const index = Number(name);

			if (Number.isNaN(index)) {
				return Reflect.get(target, name, receiver);
			}

			return target[(target.length + index) % target.length];
		},
		set(target, name, value, receiver) {
			if (typeof name !== 'string') {
				return Reflect.set(target, name, value, receiver);
			}

			const index = Number(name);

			if (Number.isNaN(index)) {
				return Reflect.set(target, name, value, receiver);
			}

			target[(target.length + index) % target.length] = value;

			return true;
		}
	});
};
