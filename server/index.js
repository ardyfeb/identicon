const micro = require('micro');
const query = require('query-string');
const identicon = require('../lib');

function handle(request, response) {
  const requestQuery = query.parseUrl(request.url, { parseNumbers: true }).query;
  const magic_words = requestQuery.word;

  if (!magic_words) {
    micro.send(response, 400, {
      error: 'missing_magic_word',
      message: 'Please provide a word into query'
    })

    return;
  }

  // TODO: Infer from default options
  const { 
    border = 50, 
    size = 5, 
    scale = 500, 
    format = 'png'
  } = requestQuery;

  let background = requestQuery.background || [240, 240, 240];

  if (typeof background == 'string') {
    background = background.split(',').map(c => parseInt(c));

    if (background.length != 3 || !background.every(c => typeof c == 'number')) {
      micro.send(response, 400, {
        error: 'invalid_background',
        message: 'Invalid background color provided'
      })

      return;
    }
  }
  
  if (!['png', 'jpeg'].includes(format)) {
    micro.send(response, 400, {
      error: 'invalid_format',
      message: 'Valid format is png, jpg'
    })

    return;
  }

  try {
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
    response.setHeader('cache-control', 'public,max-age=36000');
  
    micro.send(response, 200, buffer);
  } catch (error) {
    micro.send(response, 500, { 
      error: 'unexpected-error',
      message: 'Cannot process identicon'
    })
  }
}

module.exports = handle