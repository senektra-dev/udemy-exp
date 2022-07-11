import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import cookieParser from 'cookie-parser';
import art from 'express-art-template';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine('art', art);
app.set('view engine', 'art');

app.use(helmet());
app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/login', async (req, res) => {
  res.render('login');
});

app.post('/process_login', async (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;
  
  // Check db if username and password are correct
  if (password === 'x') {
    // res.cookie takes 2 args
    // 1. name of the cookie
    // 2. value of the cookie
    res.cookie('username', username);
    // res.redirect takes 1 arg
    // 1. path to redirect to
    res.redirect('/welcome');
  } else {
    res.urlencoded()
    res.redirect('/login?msg=fail');
  }
});

app.get('/logout', async (req, res) => {
  // res.clearCookie takes 1 arg
  // 1. name of the cookie
  res.clearCookie('username');
  res.redirect('/login');
});

app.get('/statement', async (req, res) => {
  // This will render the statement
  // res.sendFile(path.join(__dirname, 'userStatement', 'BankStatementChequing.png'));
  // We can use the download method to download the file
  res.download(path.join(__dirname, 'userStatement', 'BankStatementChequing.png'), 'John\'s Chequing Statement.png', (err) => {
    if (err && !res.headersSent) res.redirect('/download/error');
  });
});

app.get('/welcome', async (req, res) => {
  res.render('welcome', {
    username: req.cookies.username,
  });
});

// app.param takes 2 args
// 1. name of the param
// 2. function to run when param is found
app.param('id', async (req, res, next, id) => {
  console.log('id', id);
  next();
});

// When you use a : in a route, it is a placeholder for a variable
app.get('/story/:id', async (req, res) => {
  // the req.params object has a property for each param in the route
  res.send(`Story ${req.params.storyId}`);
});

// When you use a : in a route, it is a placeholder for a variable
app.get('/story/:storyId/:link', async (req, res) => {
  // the req.params object has a property for each param in the route
  res.send(`Story link: ${req.params.link}`);
});

app.listen(7272);
