const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// LOAD USER MODEL
require('./models/User');

// PASSPORT CONFIG
require('./config/passport')(passport);

// LOAD ROUTES
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');
// LOAD KEYS
const keys = require('./config/keys');

// MAP GLOBAL PROMISES
mongoose.Promise = global.Promise;
// MONGOOSE CONNECT
mongoose.connect(keys.mongoURI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//SETTING UP INSTANCE OF EXPRESS SERVER
const app = express();

//HANDLEBARS 
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



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

//SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// USE ROUTES
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});


