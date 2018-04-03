//DEPENDENCIES
const express = require('express');
const mongoos = require('mongoose');
const passport = require('passport');

//PASSPORT CONFIG
require('./config/passport')(passport);


//LINK /LOAD OAUTH ROUTES
const auth = require('./routes/auth');


//EXPRESS SERVER INSTANCE
const app = express();

app.get(' / ', (req, res) => {
    res.send('It Works!');
});

//USE ROUTES
app.use('/auth', auth);

//ALLOWS APP TO RUN IN EITHER SPECIFIED ENVIORNMENT OR ON DEDICATED PORT #
const port = process.env.PORT || 5000;

//THIS WILL CONFIRM SERVER IS LIVE BY GOING LOCAL HOST: 5000. 
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});