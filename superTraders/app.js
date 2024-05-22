
require('dotenv').config({ path: `${process.cwd()}/.env` });

const catchAsync= require('../superTraders/utils/catchAsync')
const express= require('express');
const authRouter = require('./route/authRoute');
const buyRouter = require('./route/buyRoute');
const sellRouter = require('./route/sellRoute');
const shareRouter = require('./route/shareRoute');
const userLotsRouter = require('./route/userLotsRoute');
const portfolioRouter = require('./route/portfolioRoute');


const AppError = require('./utils/appError');
const { stack } = require('sequelize/lib/utils');
const globalErrorHandler = require('./controller/errorController');
const app = express();

app.use(express.json());


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/buys',buyRouter);
app.use('/api/v1/sell',sellRouter);
app.use('/api/v1/share',shareRouter);
app.use('/api/v1/userLots',userLotsRouter);
app.use('/api/v1/portfolio',portfolioRouter);


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