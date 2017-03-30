import express = require('express');
import { userModel, IUser } from '../models';

var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('signin');


    })
    .post(async (req, res, next) => {
        var name = req.body.name;
        req.session.user = await userModel.findOne({ name }).exec();
        res.redirect('/');

    })



export { router as signinRouter };