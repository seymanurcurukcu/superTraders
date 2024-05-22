const { authentication } = require('../controller/authController');
const { createsell } = require('../controller/sellController');

const router= require('express').Router();

router.route('/').post(authentication,createsell)

module.exports=router;