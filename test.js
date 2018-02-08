const express = require('express');
const app = express();
const refreshUse = require('./index');

app.get('/lala', (req, res) => {
  res.send('lala');
});

app.get('/lili', (req, res) => {
  res.send('lili');
});

router2 = express.Router();

router2.get('/toto', (req, res) => {
  res.send('toto');
});

app.use('/lolo', router2);

router = express.Router();

router.get('/lala', (req, res) => {
  res.send('baba');
})

router.get('/lolo', (req, res) => {
  res.send('lolo');
});

refreshUse(app, router, '/');

app.listen('3001', () => {
  console.log('ok');
})
