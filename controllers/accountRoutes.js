const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try{
        const currentUser = await User.findByPk(req.session.id);
        res.render('account');
    }catch(err){
        res.render(err);
    }
});

module.exports = router;