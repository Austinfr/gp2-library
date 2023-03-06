const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        res.render('checkoutpage');
    }catch(err){
        res.render(err);
    }
});

module.exports = router;