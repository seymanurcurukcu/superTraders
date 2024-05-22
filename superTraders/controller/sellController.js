const User = require('../db/models/user');
const Portfolio = require('../db/models/portfolio');
const Share = require('../db/models/share');
const Trade = require('../db/models/trade');
const UserLot = require('../db/models/userlot');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

require('dotenv').config({ path: `${process.cwd()}/.env` });

const createsell = catchAsync(async(req,res,next)=>{
    const { ShareId, Lots } = req.body;
    const UserID = req.user.id;

    try{
        const user = await User.findByPk(UserID);
        const portfolio = await Portfolio.findOne({ where: { UserID } });
        const share = await Share.findByPk(ShareId);
        const userlot = await UserLot.findOne({ where: { UserID, ShareId } });

        if (!user || !portfolio || !share || !userlot || userlot.TotalNumberOfShare < Lots) {
            return next(new AppError('Invalid request', 400));
          }
          if (portfolio.TotalBalance - (share.Price * Lots) < 0) {
            return next(new AppError('You do not have enough balance to sell these shares', 400));
        }
          const newTrade = await Trade.create({
            UserID,
            ShareId,
            Lots,
            BuyOrSell: false,
            BeforePrice: share.Price
          });
          userlot.TotalNumberOfShare -= Lots;
          userlot.TotalBalanceOfShare -= (share.Price * Lots);
          await userlot.save();
      
          portfolio.TotalBalance += (share.Price * Lots);
          await portfolio.save();
          return res.status(201).json({
            status:'success',
            data:newTrade,
        });
    }
    catch (error) {
        return next(new AppError('Internal Server Error', 500));

      }
    
})

module.exports={createsell}