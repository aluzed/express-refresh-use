const express = require('express');
const app = express();
const refreshUse = require('./index');

app.get('/lala', (req, res) => {
  res.send('lala');
});

router = express.Router();

router.get('/lala', (req, res) => {
  res.send('lolo');
})

refreshUse(app, router, '/');

app.listen('3001', () => {
  console.log('ok');
})
