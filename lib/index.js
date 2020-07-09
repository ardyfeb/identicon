const fs = require('fs');
const native = require('../native/index.node');

exports.generate = function(word, options) {
  const buffer = native.generate(word, {
    border: 50,
    size: 5,
    scale: 500,
    background: [240, 240, 240],
    format: 'png',
    ...options
  })

  return buffer
}

exports.generateToFile = function(word, fileName, options) {
  fs.writeFileSync(fileName, this.generate(word, options))
}
