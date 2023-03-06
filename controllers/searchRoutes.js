const router = require('express').Router();
const { Card } = require('../models');

router.get('/', async (req, res) => {
    try {
        const cardData = await Card.findAll({
          where: { user_id: req.session.user_id },
        });
        console.log(cardData);
        const cards = cardData.map((card) => card.get({ plain: true }));
        res.render('search', { username: req.user.username, cards });
      } catch (err) {
        res.status(500).json({ message: err });
      }
});

router.get('/:name', async (req, res) => {
    try{

    } catch(err){
        res.status(500).json({message: err});
    }
});

module.exports = router;