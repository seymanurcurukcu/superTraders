const { shareAdd, sharePut, getAllShare } = require("../controller/shareController");

const router= require('express').Router();

router.route('/add').post(shareAdd);
router.route('/put').post(sharePut);
router.route('/').get(getAllShare);
module.exports=router;