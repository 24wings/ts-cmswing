import express = require('express');
import { userModel, IUser } from '../models';

var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        var users = await userModel.find().exec();

        res.render('admin', {
            users
        })
    })
    .post(async () => {

    })

router.route('/:_id')
    .delete(async (req, res, next) => {
        var result = await userModel.remove({ _id: req.params._id }).exec();
        res.json({
            issuccess: true,
            data: result
        });
    })

export { router as userRouter };