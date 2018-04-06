const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

// PASSPORT CONFIG
require('./config/passport')(passport);

// LOAD ROUTES
const auth = require('./routes/auth');

// LOAD KEYS
const keys = require('./config/keys');

// MAP GLOBAL PROMISE
mongoose.Promise = global.Promise;
// MONGOOSE CONNECT-ISSUES WITH THIS CONNECTION//

mongoose.connect(keys.mongoURI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('It Works!');
});

// USE ROUTES
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});