import express from 'express';

const app = express();

// Express does two things
// 1. Router - Does routing
// 2. Middleware - Adds extra functionality between requests 

// req ~~~ MIDDLEWARE ~~~ res
// Middleware is a function that has access to the request, response, and next objects
// 1. Request comes in
// 2. We need to validate the user, sometimes
// 3. We need to store things in the db
// 4. If there is data from the user, we need to parse it and store it
// 5. We need to send back a response

async function validateUser(req, res, next) {
  // Get info out of req object.
  res.locals.validated = true;

  console.log('validateUser ran');
  next();
}

// It was all just middleware all along.
// app.use('/admin', validateUser);
// app.get('/admin', async (req, res, next) => {
//   // Get info out of req object.
//   res.locals.validated = true;

//   console.log('validateUser ran');
//   next();
// });

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.get('/admin', )

app.listen(7272);
