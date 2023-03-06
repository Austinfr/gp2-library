
const router = require('express').Router();
const { Book, Card, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const books = await Book.findAll();
        res.render('homepage', { books });
    } catch (err) {
        res.status(500).json(err);
    }
});
//routes to get all books //

// router.get('/', async (req, res) => {
//     const bookData = await Book.findAll().catch((err) => {
//     res.json(err);
// });
// const books = bookData.map((book) => { book.get({ plain: true }); });
//     res.render('all', { books });
// });


// route to get a single book //

// router.get('/book/:id', async (req, res) => {
//     try{
//         const bookData = await Book.findByPk(req.params.id,); 
//             if(!bookData){
//                 res.status(404).json({ message: 'No book found with this id'});
//                 return;
//     }
//     const book = bookData.get({ plain: true });
//     res.render('book', book);
// } catch (err) {
//     res.status(500).json(err);
// };
//     });

router.get('/login', async (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
