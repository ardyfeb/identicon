const identicon = require('../lib');

function handle(request, response) {
  const magic_words = request.query.word;

  if (!magic_words) {
    response
      .status(400)
      .json(
        {
          error: 'missing_magic_word',
          message: 'Please provide a word into query'
        }
      )

    return;
  }

  // TODO: Infer from default options
  const { 
    border = 50, 
    size = 5, 
    scale = 500, 
    format = 'png'
  } = request.query;

  let background = request.query.background || [240, 240, 240];

  if (typeof background == 'string') {
    background = background.split(',').map(c => parseInt(c));

    if (background.length != 3 || !background.every(c => typeof c == 'number')) {
      response
        .status(400)
        .json(
          {
            error: 'invalid_background',
            message: 'Invalid background color provided'
          }
        )

      return;
    }
  }
  
  if (!['png', 'jpeg'].includes(format)) {
    response
      .status(400)
      .json(
        {
          error: 'invalid_format',
          message: 'Valid format is png, jpg'
        }
      )
  }

  const buffer = identicon.generate(
    magic_words, 
    {
      border,
      size,
      scale,
      background,
      format,
    }
  )

  response.setHeader('content-type', `image/${format}`);
  response.send(buffer);
}

module.exports = handle