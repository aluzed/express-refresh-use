const express = require('express');
const app = express();
const refreshUse = require('./index');

app.get('/lala', (req, res) => {
  res.send('lala');
});

app.get('/lili', (req, res) => {
  res.send('lili');
});

router1 = express.Router();

router1.get('/toto', (req, res) => {
  res.send('toto');
});

// /lolo/toto
app.use('/lolo', router1);


router2 = express.Router();

router2.get('/lala', (req, res) => {
  res.send('baba');
})

router2.get('/toto', (req, res) => {
  res.send('lolo');
});

// /lolo/toto
refreshUse(app, router2, '/lolo');

app.listen('3001', () => {
  console.log('ok');
})
