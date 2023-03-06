const router = require('express').Router();
const bookSearch = require('../utils/fetchBook');

router.get('/', async (req, res) => {
    try {
        res.render('search');
      } catch (err) {
        res.status(500).json({ message: err });
      }
});

router.get('/:name', async (req, res) => {
    try{
      const bookList = bookSearch.getBookListBySearch(req.params.name);
      res.render('results', bookList);

    } catch(err){
        res.status(500).json({message: err});
    }
});

module.exports = router;