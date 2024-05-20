
require('dotenv').config({ path: `${process.cwd()}/.env` });

const catchAsync= require('../superTraders/utils/catchAsync')
const express= require('express');

const authRouter = require('./route/authRoute');
const AppError = require('./utils/appError');
const { stack } = require('sequelize/lib/utils');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(express.json());


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/buy',)

app.use(
    '*',
    catchAsync (async (req,res,next)=>{
    throw new AppError(`Can't find ${req.originalUrl} on this server`,404);
  
}));

app.use(globalErrorHandler)
const PORT = process.env.APP_PORT || 4000;
app.listen(PORT,()=>{
    console.log('Server up and running', PORT);
});