const User = require('../db/models/user');
const Portfolio = require('../db/models/portfolio');
const Share = require('../db/models/share');
const Trade = require('../db/models/trade');
const UserLot = require('../db/models/userlot');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const moment = require('moment');


require('dotenv').config({ path: `${process.cwd()}/.env` });

const createbuy = catchAsync(async (req, res, next) => {
  const { ShareId, Lots } = req.body;
  const currentTime = moment();

  const UserID = req.user.id;
  const user = await User.findByPk(UserID);
  const portfolio = await Portfolio.findOne({ where: { UserID } });
  const share = await Share.findByPk(ShareId);
  if (!portfolio) {
    await Portfolio.create({
      UserID: UserID,
      TotalBalance: 0,
      TotalShareBalance: 0
    });
  }
  if (!user || !portfolio || !share) {
    return next(new AppError('Invalid request', 400));

  };
  if (Lots > share.Lot) {
    return next(new AppError('Requested lots exceed available share lots', 400));
  }
  const totalCost = share.Price * Lots;
  if (portfolio.TotalBalance < totalCost) {
    return next(new AppError('You do not have enough funds', 400));
  }
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
    userLot.TotalBalanceOfShare += totalCost;
    userLot.updatedAt = currentTime;

    await userLot.save();
  } else {
    await UserLot.create({
      UserID,
      ShareId,
      TotalNumberOfShare: Lots,
      TotalBalanceOfShare: totalCost
    });
  }
  portfolio.TotalBalance -= totalCost;
  await portfolio.save();
  return res.status(201).json({
    status: 'success',
    data: newTrade,
  });


})

module.exports = { createbuy }