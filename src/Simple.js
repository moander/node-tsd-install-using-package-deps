import {spawn} from 'child_process';

export default class Simple {
	/**
	 * Spawn the tsd process using this.arguments
	 * @param {Array} packageNames  - An array of package names to install
	 * @param {Object} options 		- Optional options passed to the node spawn fn
	 * @param {Function} callback 	- A optional callback function
	 * @returns {child_process.ChildProcess}
	*/
	static spawn(packageNames = [], options = {}, callback = () => { }) {
		var called = 0;

		var opts = Object.assign({}, options);
		opts.tsd = Object.assign({
			bin: 'tsd',
			pre: ['install'],
			post: ['-ros']
		}, opts.tsd || {});

		var tsd = opts.tsd;
		delete opts.tsd;

		var args = [].concat(
			tsd.pre,
			packageNames,
			tsd.post
		);
		return spawn(tsd.bin, args, opts)
			.on('error', (err) => { called = Simple._callbackOnce(called, callback, err); })
			.on('close', (err) => { called = Simple._callbackOnce(called, callback, Simple._exitCodeToErr(err)); })
	}

	/**
	 * Get a combined array of pkg.dependencies and pkg.devDependencies
	 *
	 * @param {object} pkg - An object structured like package.json
	 */
	static getDepsFromPackage(pkg) {
		return [].concat(
			Object.keys(pkg.dependencies || {}),
			Object.keys(pkg.devDependencies || {})
			);
	}

	/**
	 * @internal
	 */
	static _callbackOnce(called, callback, err) {
		if (!called) callback(err);
		return ++called;
	}

	/**
	 * @internal
	 */
	static _exitCodeToErr(exitCode) {
		if (exitCode) return new Error('Exit code: ' + exitCode);
		return null;
	}
}
