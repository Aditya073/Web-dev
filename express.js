const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'Html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Html', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'Html', 'contact.html'));
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
