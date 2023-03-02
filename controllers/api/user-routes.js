const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

});

router.post('/login', async (req, res) => {

});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});