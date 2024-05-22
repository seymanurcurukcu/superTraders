const { getAllUserLot } = require("../controller/userLotController");

const router= require('express').Router();

router.route('/').get(getAllUserLot);
module.exports=router;