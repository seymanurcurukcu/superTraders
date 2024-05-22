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
        if (!user) {
          return next(new AppError('Kullanıcı bulunamadı', 400));
      }
        const portfolio = await Portfolio.findOne({ where: { UserID } });
        if (!portfolio) {
          return next(new AppError('Portföy bulunamadı', 400));
      }
        const share = await Share.findByPk(ShareId);
        if (!share) {
          return next(new AppError('Hisse bulunamadı', 400));
      }
        const userlot = await UserLot.findOne({ where: { UserID, ShareId } });
        if (!userlot) {
          return next(new AppError('Kullanıcı lotu bulunamadı', 400));
      }

      if (userlot.TotalNumberOfShare < Lots) {
        return next(new AppError('Yeterli hisseniz yok', 400));
    }
          const totalCost = share.Price * Lots;

          const newTrade = await Trade.create({
            UserID,
            ShareId,
            Lots,
            BuyOrSell: false,
            BeforePrice: share.Price
          });
          userlot.TotalNumberOfShare -= Lots;
          userlot.TotalBalanceOfShare -= totalCost;
          await userlot.save();
      
          portfolio.TotalBalance += totalCost;
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