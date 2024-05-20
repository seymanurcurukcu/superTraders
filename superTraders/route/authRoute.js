const { singup, login } = require("../controller/authController");

const router= require('express').Router();

router.route('/singup').post(singup);
router.route('/login').post(login);

module.exports=router;