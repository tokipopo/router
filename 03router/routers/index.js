const express = require('express');
const Router = express.Router();

const userRouter = require('./module/user');
const goodRouter = require('./module/goods');
const orderRouter = require('./module/order');
const uploadRouter = require('./module/upload');

Router.use('/user',userRouter);
Router.use('/goods',goodRouter);
Router.use('/order',orderRouter);
Router.use('/upload',uploadRouter);

module.exports = Router;