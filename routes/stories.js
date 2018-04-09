const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');//040918
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//STORIES INDEX
router.get('/', (req,res) => {
    res.render('stories/index');
});

//ADD STORY FORM
router.get('/add', ensureAuthenticated, (req,res) => {
    res.render('stories/add');
});

//040918 PROCESS ADD STORY
router.post('/', (req, res) => {
   let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }
    //040918
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments:allowComments,
        user: req.user.id
    }

    //040918 CREATE STORY
    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`);
        });
});

module.exports = router;