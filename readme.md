## Express-Refresh-Use

Update app.router stack by new routes before use.

### How to install

```
npm i -S express-refresh-use
```

### How to use

```javascript
const express = require('express');
const app = express();
const refreshUse = require('express-refresh-use');

app.get('/lala', (req, res) => {
  res.send('lala');
});

router = express.Router();

router.get('/lala', (req, res) => {
  res.send('lolo');
})

refreshUse(app, router, '/');

app.listen('3000', () => {
  console.log('Listening');
});
```

Then when you launch a curl :

```
curl http://localhost:3000/lala

-> lolo
```
