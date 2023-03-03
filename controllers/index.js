const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const mainRoutes = require('./mainRoutes');
const cartRoutes = require('./cartRoutes');
const accountRoutes = require('./accountRoutes');

router.use('/', homeRoutes);
router.use('/search', mainRoutes);
router.use('/cart', cartRoutes);
router.use('/account', accountRoutes);
router.use('/api', apiRoutes);


router.use((req,res)=>{
    res.send('<h2> 404 NOT FOUND </h2>');
});


module.exports = router;