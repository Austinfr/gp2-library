const router = require('express').Router();
const { Book } = require('../models');

router.get('/', async (req, res) => {
    try {
        const bookList = await Book.findAll();
        let bookarr = [];
        for(let book of bookList){
            bookarr.push({title: book.dataValues.title, author: book.dataValues.author, description: book.dataValues.description});
        }
        res.render('dashboard', bookarr);
    } catch (err) {
        res.status(500).json(err);
    }

});
router.get('/signup', async (req, res) =>{
    res.render('signup')
});

router.get('/login', async (req, res) => {
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
