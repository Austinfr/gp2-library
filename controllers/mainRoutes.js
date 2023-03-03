const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        res.render('searchpage');   
    } catch (err) {
        res.render(err);
    }
});

router.get('/:name', async (req, res) => {
    try {
        res.render('searchResults', req.params.name);
    }catch(err){
        res.render(err);
    }
});

module.exports = router;