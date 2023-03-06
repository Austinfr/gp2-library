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
      //this will get the result of the request giving the title an author but does not redirect or display
      await bookSearch.getBookListBySearch(req.params.name, 20).then(result => {
        res.render('results', result);
      });
      

    } catch(err){
        res.status(500).json({message: err});
    }
});

module.exports = router;