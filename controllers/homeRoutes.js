const router = require('express').Router();
const { Book } = require('../models');

router.get('/', async (req, res) => {
    try {
        const bookList = await Book.findAll();
        // let tony = bookList.map(jery => {
        //     return jery.get({plain:true})
        // })
        // console.log(tony)

        // let bookarr = [];
        // for(let book of bookList){
        //     bookarr.push({title: book.dataValues.title, author: book.dataValues.author, description: book.dataValues.description});
        // }
        const bookarr = bookList.map((book) => book.get({plain: true}));
        console.log(bookarr)
        res.render('dashboard', {
            bookarr
        });
    } catch (err) {
        res.status(500).json(err);
    }

});
router.get('/signup', async (req, res) =>{
    res.render('signup')
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
    if(req.session.logged_in){
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
