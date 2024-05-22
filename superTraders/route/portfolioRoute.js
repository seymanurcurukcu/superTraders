const { portfolioPut, getAllPortfolio } = require("../controller/portfolioController");
const { authentication } = require('../controller/authController');


const router= require('express').Router();

router.route('/put').post(authentication,portfolioPut);
router.route('/').get(getAllPortfolio);
module.exports=router;
