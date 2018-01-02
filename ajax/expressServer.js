const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // res.redirect('/new');
  res.sendFile('index.html', {root: './'});
});

app.get('/info', (req, res) => {
  res.json({
    name: 'ding'
  });
});

// app.get('/new', (req, res) => {
//   res.send('hello new page');
// });

app.listen(3000, () => {
  console.log('running on port 3000...');
});
