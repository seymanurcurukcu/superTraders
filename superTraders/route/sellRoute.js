const { createsell } = require('../controller/sellController');

const router= require('express').Router();

router.route('/').post(createsell)

module.exports=router;