# Identicon
Blazing fast identicon generator for nodejs based on [identicon-rs](https://github.com/fluffy-samurai/identicon-rs).
What is Identicon ? https://en.wikipedia.org/wiki/Identicon

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
