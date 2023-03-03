const router = require('express').Router();

const userRoutes = require('./userRoutes');
const cardRoutes = require('./card');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;