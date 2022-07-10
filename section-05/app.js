import express from 'express';
import helmet from 'helmet';
import art from 'express-art-template';

const app = express();

app.engine('art', art);
app.set('view engine', 'art');

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

// app.post('/ajax', (req, res) => {
//   console.log(req.body);
//   res.json("test");
// });

// How render works as a process
// We define a template engine
// In a route, we have a res.render()
// We pass the template name and the data to render
// Express will use the template engine to render the template
// The product is the rendered HTML

app.get('/', async (req, res) => {
  // res.send('sanity check');  
  console.log(req);
  // Data passed to render will be available in the template via res.locals
  // Locals is pass to the template
  res.render('index', {
    title: 'Home',
    message: 'Hello World'
  });
});

app.listen(7272);
