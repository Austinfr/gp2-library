const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Card } = require('../models/index');

router.get('/', withAuth, async (req, res) => {
  try {
    const cardData = await Card.findAll({
      where: { user_id: req.user.id },
    });
    const cards = cardData.map((card) => card.get({ plain: true }));
    res.render('dashboard', { login: req.isAuthenticated(), username: req.user.username, cards });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
