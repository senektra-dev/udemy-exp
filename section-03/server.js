import http from 'http';
import * as fs from 'node:fs/promises'


// The http module has a createServer method that takes a callback function.
// The callback function is called when a request is made to the server. It
// has two arguments: req and res. The req argument is an object that contains
// information about the request. The res argument is an object that contains
// methods for sending a response to the client.
const server = http.createServer(async (req, res) => {
  // Show requested url.
  console.log(req.url);
  
  if (req.url === '/') {
    // User wants home page.
    try {
      const file = await fs.readFile('node.html', 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });    
      res.end(file);
    } catch (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>${res.statusCode}: ${err}</h1>`);
    }
  } else if (req.url === '/node.png') {
    try {
      const file = await fs.readFile('node.png');
      res.writeHead(200, { 'Content-Type': 'image/png' });    
      res.end(file);
    } catch (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>${res.statusCode}: ${err}</h1>`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`<h1>${res.statusCode}: File Not Found</h1>`);
  }
});

// createServer returns an object with a listen method. The listen method takes
// a callback function. The callback function is called when the server is
// ready to accept connections.
server.listen(7272);
