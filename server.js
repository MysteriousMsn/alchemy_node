require('dotenv/config');
const express = require('express');
const { json, urlencoded } = express;
const app = express();
const port = process.env.PORT;

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 10000 }));

global.models = require('./db/models');
global.utils = require('./helpers/utils');

app.use('/api/', require('./routes'));

app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
