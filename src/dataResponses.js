const respond = (request, response, acceptedTypes, status, object) => {
  const headers = {
    'Content-Type': acceptedTypes[0],
  };

  let stringified;

  if (acceptedTypes[0] === 'application/json') {
    stringified = JSON.stringify(object);
  } else if (acceptedTypes[0] === 'text/xml') {
    // https://masteringjs.io/tutorials/fundamentals/foreach-key-value
    stringified = '<response>';
    Object.entries(object).forEach((entry) => {
      const [key, value] = entry;
      stringified += `<${key}>${value}</${key}>`;
    });
    stringified += '</response>';
  }

  response.writeHead(status, headers);
  response.write(stringified);
  response.end();
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, acceptedTypes, 404, responseJSON);
};

module.exports = {
  notFound,
};
