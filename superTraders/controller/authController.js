const User = require("../db/models/user");
const Portfolio =require("../db/models/portfolio");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
require('dotenv').config({
    path: `${process.cwd()}/.env`
});

const generateToken = (payload) => {
    const expiresIn = process.env.JWT_EXPIRES_IN;

    // ExpiresIn value validation
    if (!expiresIn || (!/^\d+$/.test(expiresIn) && !/^\d+[smhd]$/.test(expiresIn))) {
        throw new Error('"expiresIn" should be a number of seconds or string representing a timespan');
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn,
    });
};

const signup = catchAsync(async (req, res, next) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return next(new AppError('Passwords do not match', 400));
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
    
        if (!newUser) {
            return next(new AppError('Failed to create the user', 400));
        }
        await Portfolio.create({
            UserID: newUser.id,
            TotalBalance: 0,
            TotalShareBalance: 0
          });
        const result = newUser.toJSON();
    
        delete result.password;
        delete result.deletedAt;
    
        result.token = generateToken({ id: result.id });
    
        return res.status(201).json({
            status: 'success',
            data: result,
        });
   

  
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const result = await User.findOne({ where: { email } });

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({ id: result.id });

    return res.json({
        status: 'success',
        token,
    });
});

const authentication = catchAsync(async(req,res,next)=>{
    let idToken ='';
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        idToken = req.headers.authorization.split(' ')[1];
    }
    if(!idToken){
        return next(new AppError('Please login to get access',401));
    }
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    const freshUser = await User.findByPk(tokenDetail.id);
    if(!freshUser){
        return next(new AppError('User no longer exists',400))
    }
    req.user= freshUser;
    return next();
});


module.exports = { signup, login, authentication };
