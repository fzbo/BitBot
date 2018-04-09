const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//STORIES INDEX
router.get('/', (req,res) => {
    res.render('stories/index');
});

//ADD STORY FORM
router.get('/add', ensureAuthenticated, (req,res) => {
    res.render('stories/add');
});

module.exports = router;