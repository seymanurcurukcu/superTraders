const User = require('../db/models/user');
const Portfolio = require('../db/models/portfolio');
const Share = require('../db/models/share');
const Trade = require('../db/models/trade');
const UserLot = require('../db/models/userlot');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

require('dotenv').config({ path: `${process.cwd()}/.env` });

const createbuy = catchAsync(async(req,res,next)=>{
    const { ShareId, Lots } = req.body;
    const UserID = req.user.id;
    try{
        const user = await User.findByPk(UserID);
        const portfolio = await Portfolio.findOne({ where: { UserID } });
        const share = await Share.findByPk(ShareId);
        if(!portfolio){
          await Portfolio.create({
            UserID: UserID,
            TotalBalance: 0,
            TotalShareBalance: 0
          });
        }
        if (!user || !portfolio || !share) {
            return next(new AppError('Invalid request', 400));

          };
          const newTrade = await Trade.create({
            UserID,
            ShareId,
            Lots,
            BuyOrSell: true,
            BeforePrice: share.Price
          });
          const userLot = await UserLot.findOne({ where: { UserID, ShareId } });
          if (userLot) {
            userLot.TotalNumberOfShare += Lots;
            userLot.TotalBalanceOfShare += share.Price * Lots;
            await userLot.save();
          } else {
            await UserLot.create({
              UserID,
              ShareId,
              TotalNumberOfShare: Lots,
              TotalBalanceOfShare: share.Price * Lots
            });
          }
          portfolio.TotalBalance -= share.Price * Lots;
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

module.exports={createbuy}