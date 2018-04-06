const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// LOAD USER MODEL
require('./models/User');

// PASSPORT CONFIG
require('./config/passport')(passport);

// LOAD ROUTES
const auth = require('./routes/auth');

// LOAD KEYS
const keys = require('./config/keys');

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise;
// MONGOOSE CONNECT
mongoose.connect(keys.mongoURI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const app = express();

app.get('/', (req, res) => {
  res.send('It Works!');
});

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// SET GLOBAL VARS
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// USE ROUTES
app.use('/auth', auth);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});