const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Share = require("../db/models/share");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});



const shareAdd = catchAsync(async (req, res, next) => {
    const { ShareName, ShortShareName, Price, BeforePrice, Lot } = req.body;
    try {
        const newShare = await Share.create({
          ShareName,
          ShortShareName,
          Price,
          BeforePrice,
          Lot
        });
    
        return res.status(201).json({
            status:'success',
            data:newShare,
        });
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          return next(new AppError('Failed to create the share', 400));

        } else {
            return next(new AppError('Internal Server Error', 500));

        }
      }
 
});

const sharePut = catchAsync(async (req, res, next) => {
    const { ShareId, Price } = req.body;
    try {
        const share = await Share.findByPk(ShareId);
    
        if (!share) {
          return next(new AppError('Share not found', 404));

        }
    
        if (!/^\d+(\.\d{1,2})?$/.test(Price)) {
          return next(new AppError('Price must be a decimal number with up to 2 decimal places', 400));

        }
    
        share.BeforePrice = share.Price;
        share.Price = Price;
        await share.save();
    
        return res.status(201).json({
            status:'success',
            data:share,
        });
      } catch (error) {
        return next(new AppError('Internal Server Error', 500));

      }
 
});

const getAllShare = catchAsync(async(req,res,next)=>{
    const result = await Share.findAll();
    return res.json({
        status:'success',
        data:result
    })
})

module.exports = { shareAdd, sharePut, getAllShare };
