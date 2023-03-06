const router = require('express').Router();
const { Op } = require('sequelize');
const withAuth = require('../../utils/auth');
const { Book } = require('../../models/index');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
            include: [{ attributes: ['name'] }]
        });
        const book = bookData.get({ plain: true });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/:id/checkout', withAuth, async (req, res) => {
    try {
        const book_id = req.params.id;
        await Book.update({
            borrowed_by: req.session.user_id,
            borrowed_date: new Date().toJSON()
        }, 
        {
            where: { 
                id: book_id 
            }
        });

        res.redirect('search', { message: 'The book has been checked out successfully.' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
});

router.post('/:id/return', withAuth, async (req, res) => {
    try {
        const book_id = req.params.id;
        await Book.update({
            borrowed_by: null
        }, 
        {
            where: { 
                id: book_id 
            }
        });
        res.redirect('account', { message: 'The book has been returned successfully.' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
});

module.exports = router;
