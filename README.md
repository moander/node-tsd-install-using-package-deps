## Installation

    npm install --save-dev tsd-install-using-package-deps

## Usage

```js
const gulp 	  = require('gulp');
const tsddeps = require('tsd-install-using-package-deps');

gulp.task('tsd', (cb) => {
	return tsddeps(require('./package.json'), { stdio: null }, cb);
});
```
