# nearest-file-path
Find a relative path in a directory, travelling up the ancestral chain until found.

[![Build Status](https://travis-ci.org/cbas/nearest-file-path.svg?branch=master)](https://travis-ci.org/cbas/nearest-file-path)

[![NPM](https://nodei.co/npm/nearest-file-path.png)](https://nodei.co/npm/nearest-file-path/)

## Example

```js
import nearest from 'nearest-file-path'
/*
  File system:
  /
    x
    /a
      y
      /b
 */
// Find a file
console.log(await nearest('x', '/a/b'))   // '/x'
// Find a relative path
console.log(await nearest('a/y', '/a/b')) // '/a/y'
// Find a directory
console.log(await nearest('b', '/a/b'))   // '/a/b'
// Find the unfindable
console.log(await nearest('c', '/a/b'))   // Error
```

## nearest(subpath[, basepath])

**subpath** is a relative path to a file or directory.

**basepath** is an optional path to a nested directory from which to search upwards until the subpath is found. Defaults to the current working directory.

Asynchronous with promises for that `async`/`await` goodness. Resolves with the absolute path as a string. Otherwise throws an error.
