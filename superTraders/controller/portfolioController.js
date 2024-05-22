
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Portfolio = require("../db/models/portfolio");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});

const portfolioPut = catchAsync(async (req, res, next) => {
    const { TotalBalance } = req.body;
    const UserID = req.user.id;

    try {
        const portfolio = await Portfolio.findOne({ where: { UserID } });
    
        if (!portfolio) {
          return next(new AppError('portfolio not found', 404));

        }
    
        if (!/^\d+(\.\d{1,2})?$/.test(TotalBalance)) {
          return next(new AppError('TotalBalance must be a decimal number with up to 2 decimal places', 400));

        }
        portfolio.TotalBalance=TotalBalance;
        await portfolio.save();
    
        return res.status(201).json({
            status:'success',
            data:portfolio,
        });
      } catch (error) {
        return next(new AppError('Internal Server Error', 500));

      }
 
});
const getAllPortfolio = catchAsync(async(req,res,next)=>{
    
    const result = await Portfolio.findAll();
    return res.json({
        status:'success',
        data:result
    })
})

module.exports = { portfolioPut, getAllPortfolio };