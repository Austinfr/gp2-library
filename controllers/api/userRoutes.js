// const router = require('express').Router();
// const { User } = require('../../models');

// router.post('/', async (req, res) => {

// });

// router.post('/login', async (req, res) => {

// });

// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });

const router = require('express').Router();
const passport = require('passport');
const { User } = require('../../models');

router.post('/', async (req, res, next) => {
    try {
        const newUserData = await User.create(req.body);
        const newUser = newUserData.get({ plain: true });
        req.login(newUser, err => {
            if (err) { return next(err); }
            res.redirect('/homeRoutes');
        });
    } catch (err) {
        res.status(400).send(err.errors.map(e => e.message));
    }
});

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/homeRoutes',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/login');
    });
});

module.exports = router;