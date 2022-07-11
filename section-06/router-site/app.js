import express from 'express';
import helmet from 'helmet';

import router from './theRouter.js';

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', router);

app.listen(7272);
