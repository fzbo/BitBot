const express = require('express');
const router = express.Router();

//STORIES INDEX
router.get('/', (req,res) => {
    res.render('stories/index');
});

//ADD STORY FORM
router.get('/add', (req,res) => {
    res.render('stories/add');
});

module.exports = router;