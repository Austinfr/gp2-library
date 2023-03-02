const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const searchRoutes = require('./search-routes');
const cartRoutes = require('./cart-routes');
const accountRoutes = require('./account-routes');

router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/cart', cartRoutes);
router.use('/account', accountRoutes);
router.use('/api', apiRoutes);

module.exports = router;