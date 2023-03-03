const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Card } = require('../../models/index');

//get the add library card page
router.get('/', withAuth, (req, res) => {
    res.render('newlibrarycard', { login: req.isAuthenticated(), username: req.user.username });
});

//add a new library card
router.post('/', withAuth, async (req, res) => {
    const { cardNumber } = req.body;
    const userId = req.user.id;
    try {
        const libraryCardData = await Card.create({
            card_number: cardNumber,
            user_id: userId
        });
        res.redirect('/homeRoutes');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
