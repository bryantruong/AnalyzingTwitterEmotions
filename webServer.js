const express = require('express');
const app = express();
const path = require('path');
//Make this global, since we want api.js to access app
global.app = express();
//Register api as middle, and set its path to be "api"
app.use('/api', require('./api.js'))

app.get('/', (req, res) => {
  app.use(express.static(path.join(__dirname, 'dist')));
  res.sendFile(path.join(__dirname, '/dist/index.html'))
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

