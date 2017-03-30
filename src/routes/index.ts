import express = require('express');
import moment = require('moment');

import { IUser, userModel, recordModel, IRecord } from '../models';

var router = express.Router();

/* GET home page. */
router.route('/')
  .get(async (req, res, next) => {

    if (res.locals.user) {
      var user = await userModel.findById(res.locals.user._id).exec();
      var record = await recordModel.findOne({ user: user._id }).populate('toUser').exec();
      res.render('index', {
        user,
        record
      });
    } else {
      res.redirect('/signup');
    }
  }).post(async (req, res, next) => {
    // 默认第一步
    var user = res.locals.user;
    var record = await recordModel.update({ user: user._id }, { $set: { state: 1 } }).exec();
    res.redirect('/');
  })

export { router as indexRouter };
export { signupRouter } from './signup';
export { adminRouter } from './admin';
export { userRouter } from './user';
export { signinRouter } from './signin';

