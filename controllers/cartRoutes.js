const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        res.render('checkoutpage');
    }catch(err){
        res.render(err);
    }
});

module.exports = router;