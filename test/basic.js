require('source-map-support').install();

const tsddeps = require('../');
const del = require('del');

describe('basic tests', function () {

	after(() => del(['tsd.json', 'typings/']));

	describe('install tests', function () {
		this.timeout(5000);
		after(() => del('tsd.json'));

		it('should work with empty package', (done) => {
			tsddeps({}, { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with no dependencies', (done) => {
			tsddeps({
				dependencies: {}
			}, { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with dependencies', (done) => {
			tsddeps({
				dependencies: {
					angular: '1.2.3'
				}
			}, { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with devDependencies', (done) => {
			tsddeps({
				devDependencies: {
					gulp: '1.2.3',
					notExistingDep: '1.2.3',
				}
			}, { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with both dependencies and devDependencies', (done) => {
			tsddeps({
				dependencies: {
					angular: '1.2.3'
				},
				devDependencies: {
					gulp: '1.2.3',
					notExistingDep: '1.2.3'
				}
			}, { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with empty package', (done) => {
			tsddeps(require('../package.json'), { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should work with empty package', (done) => {
			tsddeps(require('../package.json'), { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', done);
		});

		it('should call callback', (done) => {
			tsddeps(require('../package.json'), { stdio: ['ignore', 'ignore', 'ignore'] }, done);
		});
	});
});
