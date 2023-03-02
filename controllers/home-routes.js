const router = require('express').Router();
const { Book, Card, User } = require('../models');

router.get('/', async (req, res) => {

});

router.get('/login', async (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;