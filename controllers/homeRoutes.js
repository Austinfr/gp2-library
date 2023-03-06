const router = require('express').Router();
const { Book, Card, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const books = await Book.findAll();
        res.render('search', { books });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/signup', async (re, res) =>{
    res.render('signup')
});

router.get('/login', async (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
