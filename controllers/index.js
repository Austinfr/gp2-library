const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const searchRoutes = require('./searchRoutes');
const accountRoutes = require('./accountRoutes');

router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/account', accountRoutes);
router.use('/api', apiRoutes);


router.use((req,res)=>{
    res.send('<h2> 404 NOT FOUND </h2>');
});


module.exports = router;