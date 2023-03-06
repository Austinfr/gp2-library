const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Book } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try{
        const currentUser = await User.findByPk(req.session.user_id);
        const checkedOutBooks = await Book.findAll({
            where: {
                borrowed_by: currentUser.id
            }
        });
        
        res.render('account');
    }catch(err){
        res.render(err);
    }
});

module.exports = router;