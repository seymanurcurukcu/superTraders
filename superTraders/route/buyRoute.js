const { createbuy } = require('../controller/buyController');

const router= require('express').Router();

router.route('/').post(createbuy)

module.exports=router;