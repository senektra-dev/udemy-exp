import http from 'http';

// The http module has a createServer method that takes a callback function.
// The callback function is called when a request is made to the server. It
// has two arguments: req and res. The req argument is an object that contains
// information about the request. The res argument is an object that contains
// methods for sending a response to the client.
const server = http.createServer((req, res) => {
  // The res object has a method called writeHead. This method takes two
  // arguments: a status code and an object that contains headers.
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // The res object has a method called end. This method takes a string as an
  // argument and sends it to the client.
  res.end('Hello World\n');
});

// createServer returns an object with a listen method. The listen method takes
// a callback function. The callback function is called when the server is
// ready to accept connections.
server.listen(7272);
