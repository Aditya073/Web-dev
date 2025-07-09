const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// EJS........................
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/stylesheet', express.static(path.join(__dirname, 'public/stylesheet')));

const user = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));

app.get('/', (req, res) => {
  res.render('index', { user });
});

// Start server...............
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
