const router = require('express').Router();

router.get('/:name', async (req, res) => {
    try{
      res.render('results', req.params.name);

    } catch(err){
        res.status(500).json({message: err});
    }
});

module.exports = router;