/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var toGet = {};
toGet.results = [];
var defaultCorsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, accept',
  'Access-Control-Max-Age': 10 // Seconds.
};
var requestHandler = (request, response) => {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.

  // for get requests, we could store info on the server and send all back to the requester
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.
    // response.end('Hello, World!');
  var headers = defaultCorsHeaders;
  var url = require('url');
  var myUrl = url.parse(request.url);
  headers['Content-Type'] = 'application/json';
  headers['Access-Control-Allow-Headers'] = 'X-Parse-Application-Id, X-Parse-REST-API-Key, Content-Type, Accept';


  if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  }

  if (request.method === 'POST') {

    const { headers, method, url } = request;
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {

      if (myUrl.pathname.indexOf('/classes') === -1) {
        response.statusCode = 404;
        console.error('error');
      } else {
        response.statusCode = 201;
      }
      toGet.results.push(JSON.parse(body));
      response.writeHead(response.statusCode);
      response.end(JSON.stringify(toGet));
    });
  }
  if (request.method === 'GET') {
    if (myUrl.pathname !== '/classes/messages') {
      response.statusCode = 404;
    } else {
      response.statusCode = 200;
    }
    response.writeHead(response.statusCode, headers);
    response.end(JSON.stringify(toGet));
  }   

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;

