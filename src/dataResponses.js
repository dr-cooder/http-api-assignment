const respond = (request, response, acceptedTypes, status, object) => {
  let type = acceptedTypes[0];
  let stringified;

  if (type === 'text/xml') {
    // https://masteringjs.io/tutorials/fundamentals/foreach-key-value
    stringified = '<response>';
    Object.entries(object).forEach((entry) => {
      const [key, value] = entry;
      stringified += `<${key}>${value}</${key}>`;
    });
    stringified += '</response>';
  } else {
    stringified = JSON.stringify(object);
    type = 'application/json';
  }

  response.writeHead(status, {
    'Content-Type': type,
  });
  response.write(stringified);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response.',
  };

  return respond(request, response, acceptedTypes, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, query) => {
  let statusCode = 400;
  let responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  if (query.valid) {
    statusCode = 200;
    responseJSON = {
      message: 'This request has the required parameters',
    };
  }

  return respond(request, response, acceptedTypes, statusCode, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, query) => {
  let statusCode = 401;
  let responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (query.loggedIn === 'yes') {
    statusCode = 200;
    responseJSON = {
      message: 'You have successfully viewed the content.',
    };
  }

  return respond(request, response, acceptedTypes, statusCode, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  return respond(request, response, acceptedTypes, 403, responseJSON);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Service Error. Something went wrong.',
    id: 'internalError',
  };

  return respond(request, response, acceptedTypes, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  return respond(request, response, acceptedTypes, 501, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, acceptedTypes, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
