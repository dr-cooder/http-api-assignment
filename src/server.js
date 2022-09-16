const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
  '/unauthorized': dataHandler.unauthorized,
  '/forbidden': dataHandler.forbidden,
  '/internal': dataHandler.internal,
  '/notImplemented': dataHandler.notImplemented,
  notFound: dataHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const handlerFunction = urlStruct[parsedUrl.pathname];
  const { query } = parsedUrl;
  const acceptedTypes = request.headers.accept.split(',');
  console.log(request.method, parsedUrl.path, acceptedTypes);

  if (handlerFunction) {
    handlerFunction(request, response, acceptedTypes, query);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, query);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
