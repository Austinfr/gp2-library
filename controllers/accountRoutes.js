const router = require('express').Router();
const { User, Book } = require('../models');

router.get('/', async (req, res) => {
    try{
        const currentUser = await User.findByPk(req.session.user_id);
        const checkedOutBooks = await Book.findAll({
            where: {
                borrowed_by: currentUser.id
            }
        });
        res.render('account', checkedOutBooks);
    }catch(err){
        res.render(err);
    }
});

module.exports = router;