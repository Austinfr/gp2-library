
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User } = require('../../models');

router.post('/', async (req, res, next) => {
    try {
        const newUserData = await User.create(req.body);
        const newUser = newUserData.get({ plain: true });
        req.login(newUser, err => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    } catch (err) {
        res.status(400).send(err.errors.map(e => e.message));
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
        res.status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
        res.status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });
  
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/logout', (req, res, next) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
          res.status(204).end();
        });
        console.log(req.session);
        res.redirect('/login');
      } else {
        res.status(404).end();
      }
});

module.exports = router;
