const { authentication } = require('../controller/authController');
const { createbuy } = require('../controller/buyController');

const router= require('express').Router();

router.route('/').post(authentication,createbuy)

module.exports=router;