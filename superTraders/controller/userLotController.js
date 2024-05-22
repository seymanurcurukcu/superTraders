
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Share = require("../db/models/share");
const UserLot = require("../db/models/userlot")
require('dotenv').config({
    path: `${process.cwd()}/.env`
});


const getAllUserLot = catchAsync(async(req,res,next)=>{
    const result = await UserLot.findAll();
    return res.json({
        status:'success',
        data:result
    })
})
const getUserLot = catchAsync(async(req,res,next)=>{
    const UserID = req.user.id;

    const result = await UserLot.findOne({ where: { UserID } });
    return res.json({
        status:'success',
        data:result
    })
})
module.exports = { getAllUserLot, getUserLot };