const { getAllUserLot,getUserLot } = require("../controller/userLotController");
const { authentication } = require('../controller/authController');

const router= require('express').Router();

router.route('/').get(getAllUserLot);
router.route('/user').get(authentication,getUserLot);

module.exports=router;