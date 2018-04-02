

//DEPENDENCIES
const express = require('express');
const mongoos = require('mongoose');

//EXPRESS SERVER INSTANCE
const app = express();

app.get(' / ', (req, res) => {
    res.send('It Works!');
});

const port = process.env.PORT || 5000;

//THIS WILL CONFIRM SERVER IS LIVE BY GOING LOCAL HOST: 5000. 
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});