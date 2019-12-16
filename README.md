# oh-my-disk

[![npm version](https://img.shields.io/npm/v/oh-my-disk.svg?style=flat-square)](https://npmjs.com/package/oh-my-disk)
[![Node.js Version](http://img.shields.io/node/v/oh-my-disk.svg?style=flat-square)](https://nodejs.org/en/)

Conditionally run a command when free disk space is under a threshold

## Example

Run another command if free disk space is less than 500 MB:

```sh
npx oh-my-disk@1 500mb "echo DANGER"
```
