/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var results = require('./Results.js');
var toGet = {};
toGet.results = [];
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
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

  // response.setHeader('Content-Type', 'application/json');
  // response.setHeader('access-control-allow-headers', 'X-Parse-Application-Id, X-Parse-REST-API-Key, content-type');
  // response.setHeader('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // response.setHeader('access-control-allow-origin', '*');
  // response.setHeader('access-control-max-age', 10);

  // The outgoing status.
  // var method = request.method;
  // var url = request.url;
 // if endpoint (?) is nonexistent, change this to 404

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.

  // for get requests, we could store info on the server and send all back to the requester
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

    // might need a request listener function?

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

 
    // will later add control flow for bad requests (404 error etc)
  if (request.method === 'GET') {
    console.log('path name', myUrl.pathname);
    if (myUrl.pathname !== '/classes/messages') {
      response.statusCode = 404;
      console.error('error');
    } else {
      response.statusCode = 200;
    }

    // const responseBody = { headers, method, url, toGet};
    console.log(JSON.stringify(toGet));    
    // response.writeHead(statusCode, headers);
    response.writeHead(response.statusCode);
    response.end(JSON.stringify(toGet));
    // });
  } 
  if (request.method === 'POST') {
    if (myUrl.pathname !== '/classes/messages') {
      response.statusCode = 404;
      console.error('error');
    } else {
      response.statusCode = 201;
    }
    const { headers, method, url } = request;
    let body = '';
    let results = [];
    request.on('error', (error) => {
      console.error(error);
    }).on('data', (chunk) => {
      body += chunk;
    }).on('end', () => {

      response.on('error', (error) => {
        console.error(error);
      });

      if (body !== '') {
        results.push(JSON.parse(body));
        toGet.results.push(JSON.parse(body));
      }
      const responseBody = { headers, method, url, results };
      // response.writeHead(statusCode, headers);
      console.log(responseBody);
      response.end(JSON.stringify(responseBody));
    });
  }  
  // if (request.url !== '/classes/messages') {
  //   response.statusCode = 404;
  // }



 // send back something like '{results: [{message}, {message}]}''

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
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;

