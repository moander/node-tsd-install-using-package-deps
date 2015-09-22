import Simple from './Simple.js';

/**
 * Run `tsd install <dependencies from pkg> -ros`
 * @param {object} pkg  - An object structured like package.json
 * @param {Object} opts - Optional options passed to the node spawn fn
 * @param {Function} callback - A optional callback function
 * @returns {child_process.ChildProcess}
 */
export default function simple(pkg, opts = {}, callback = () => { }) {
	var dependencies = Simple.getDepsFromPackage(pkg);
	opts = Object.assign({ stdio: 'inherit' }, opts);
	return Simple.spawn(dependencies, opts, callback);
}
