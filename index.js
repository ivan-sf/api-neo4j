const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./src/controllers/UserController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', userController);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
