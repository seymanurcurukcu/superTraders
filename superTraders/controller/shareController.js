const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Share = require("../db/models/share");
const moment = require('moment');

require('dotenv').config({
    path: `${process.cwd()}/.env`
});



const shareAdd = catchAsync(async (req, res, next) => {
    const { ShareName, ShortShareName, Price, BeforePrice, Lot } = req.body;
    if (!/^[A-Z]{3}$/.test(ShortShareName)) {
      return next(new AppError('ShortShareName must be exactly 3 uppercase letters', 400));
    }
    if (!/^\d+(\.\d{1,2})?$/.test(Price)) {
      return next(new AppError('Price must be a decimal number with exactly 2 decimal places', 400));
    }

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
        const share = await Share.findByPk(ShareId);
        const lastUpdatedAt = share.getDataValue('updatedAt');
        const currentTime = moment();
        if (currentTime.diff(lastUpdatedAt, 'hours') < 1) {
          throw new AppError('You can only update the share once per hour', 429);
        }
        if (!share) {
          return next(new AppError('Share not found', 404));

        }
    
        if (!/^\d+(\.\d{1,2})?$/.test(Price)) {
          return next(new AppError('Price must be a decimal number with up to 2 decimal places', 400));

        }
    
        share.BeforePrice = share.Price;
        share.Price = Price;
        share.updatedAt = currentTime;
        await share.save();
    
        return res.status(201).json({
            status:'success',
            data:share,
        });
    
 
});

const getAllShare = catchAsync(async(req,res,next)=>{
    const result = await Share.findAll();
    return res.json({
        status:'success',
        data:result
    })
})

module.exports = { shareAdd, sharePut, getAllShare };
