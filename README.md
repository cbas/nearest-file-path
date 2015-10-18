# nearest-file-path
Find a relative path in a directory, travelling up the ancestral chain until found.

[![Build Status](https://travis-ci.org/cbas/nearest-file-path.svg?branch=master)](https://travis-ci.org/cbas/nearest-file-path)
[![codecov.io](https://codecov.io/github/cbas/nearest-file-path/coverage.svg?branch=master)](https://codecov.io/github/cbas/nearest-file-path?branch=master)

[![NPM](https://nodei.co/npm/nearest-file-path.png)](https://nodei.co/npm/nearest-file-path/)

## Example

```js
/*
  File system:
  /
    x
    /a
      y
      /b
 */

import nearest from 'nearest-file-path'
// Find a file
console.log(await nearest('x', '/a/b'))   // '/x'
// Find a relative path
console.log(await nearest('a/y', '/a/b')) // '/a/y'
// Find a directory
console.log(await nearest('b', '/a/b'))   // '/a/b'
// Find the unfindable
console.log(await nearest('c', '/a/b'))   // Error

import { nearestSync } from 'nearest-file-path'
// or the synchronous way
console.log(nearestSync('x', '/a/b')) // '/x'
```

## nearest(subpath[, basepath])

**subpath** is a relative path to a file or directory.

**basepath** is an optional path to a nested directory from which to search upwards until the subpath is found. Defaults to the current working directory.

Asynchronous with promises for that `async`/`await` goodness. Resolves with the absolute path as a string. Otherwise throws an error.

## nearestSync(subpath[, basepath])

Identical arguments as [#nearestsubpath-basepath](nearest).

Synchronous for specific use-cases where performance is not crucial. Remember to use asynchronous code where possible.
