const express = require('express');

const app = express();

const port = 2210

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.get('/', (req, res) => {
    res.render('index')
});

app.listen(port, () => { 
    console.log(`Server running on port ${port}`);
});