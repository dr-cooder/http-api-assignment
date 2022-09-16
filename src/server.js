const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  notFound: dataHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const acceptedTypes = request.headers.accept.split(',') || ['application/json'];
  console.log(request.method, parsedUrl, acceptedTypes);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
    // add .query
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
