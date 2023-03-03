const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User } = require('../models');

router.get('/', withAuth, async (req, res) => {
    try{
        const currentUser = await User.findByPk();
        res.render('accountpage');
    }catch(err){
        res.render(err);
    }
});

module.exports = router;