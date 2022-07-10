import express from 'express';
import helmet from 'helmet';
import art from 'express-art-template';
import renderFile from 'express-art-template';

const app = express();

app.engine('art', art);
app.set('view engine', 'art');

app.use(helmet());
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/login', async (req, res) => {
  res.render('login');
});

app.listen(7272);
