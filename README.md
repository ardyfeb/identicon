# Identicon
[![npm](https://img.shields.io/npm/v/@ardyfeb/identicon?color=CC3534&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@ardyfeb/identicon)
[![Docker Image](https://img.shields.io/docker/v/ardyfeb/identicon-server?color=%23099cec&logo=docker&style=for-the-badge)](https://hub.docker.com/r/ardyfeb/identicon-server)

Blazing fast identicon generator for nodejs based on [identicon-rs](https://github.com/fluffy-samurai/identicon-rs).
What is Identicon ? https://en.wikipedia.org/wiki/Identicon

Try [https://identicon-ak2o7sspyq-nn.a.run.app/?word=hello-world&background=240,240,240](https://identicon-ak2o7sspyq-nn.a.run.app/?word=hello-world&background=240,240,240) pass [options](#available-options) as query string

## Installation
Before installing this package make sure you have rust installed, read https://www.rust-lang.org/tools/install

NPM:
```bash
$ npm install @ardyfeb/identicon
```
Yarn:
```bash
$ yarn add @ardyfeb/identicon
```

## Usage
```javascript
const identicon = require('@ardyfeb/identicon')

const iconBuffer = identicon.generate("some magic words", {
  border: 50,
  background: [000, 000, 000],
  // other options
})

```
Above example is only generating nodejs [buffer](https://nodejs.org/api/buffer.html), to generate to file 
```javascript
identicon.generateToFile("some magic words", "icon.png", {
  border: 50,
  background: [000, 000, 000],
  // other options
})
```

## API
* `generate(<magic word>, <options>): Buffer`
* `generateToFile(<magic word>, <file name>, <options>): void`

see available options [here](#available-options)

## Available Options
```typescript
export interface Options {
  border?: number,
  size?: number,
  scale?: number,
  background?: number[],
  format?: 'png' | 'jpeg',
}
```
