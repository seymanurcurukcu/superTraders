const { getAllUser } = require("../controller/userController");

const router= require('express').Router();

router.route('/').get(getAllUser);

module.exports=router;