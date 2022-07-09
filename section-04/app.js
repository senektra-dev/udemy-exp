import path from 'node:path';
import express from 'express';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new express application instance
// express is the createApplication method of express
const app = express();

// Handle all requests
// app.all('/', async (req, res) => {
//   res.send('Hello World!');
// });

// app object has a few methods.
// Methods for http verbs:
// (CRUD correspondence)
// 1. get (READ) - default for all browsers
// 2. post (CREATE)
// 3. put (UPDATE)
// 4. delete (DELETE)

// app.get('/', async (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });

// app.post('/', async (req, res) => {
//   res.send();
// });

// app.put('/', async (req, res) => {
//   res.send();
// });

// app.delete('/', async (req, res) => {
//   res.send();
// });

// app has a use method that takes a middleware function.
// express.static is a middleware function that takes a path to a directory.
app.use(express.static('public'));

app.all('/', async (req, res) => {
  // express handles the basic http headers for us.
  // read node.html
  res.sendFile(path.join(__dirname, 'node.html'));
});

app.listen(7272);
