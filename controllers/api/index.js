const router = require('express').Router();

const userRoutes = require('./user-routes');
const cardRoutes = require('./card-routes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;