
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../db/models/user");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});


const getAllUser = catchAsync(async(req,res,next)=>{
    const result = await User.findAll();
    return res.json({
        status:'success',
        data:result
    })
})
module.exports = { getAllUser };