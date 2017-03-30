import express = require('express');
import { userModel, IUser, recordModel, IRecord } from '../models';

var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        var boys = await userModel.find({ gender: '男' }).exec();
        var girls = await userModel.find({ gender: '女' }).exec();
        res.render('admin', {
            boys,
            girls
        })
    })
    .post(async (req, res, next) => {
        var boys = await userModel.find({ gender: '男' }, [], {
            sort: {
                age: 1
            }
        }).exec();
        var girls = await userModel.find({ gender: '女' }, [], {
            sort: {
                age: 1
            }
        }).exec();
        for (var i = 0; i < boys.length; i++) {
            // 弹出一个男孩
            var boy = boys.shift();
            var girl = girls.shift();
            // 如果还有女孩子
            if (girl && boy) {
                await recordModel.update({ user: boy._id }, {
                    state: 2,
                    toUser: girl._id
                }).exec();
                await recordModel.update({ user: girl._id }, {
                    state: 2,
                    toUser: boy._id
                }).exec();
            } else if (!girl) {
                await recordModel.update({ user: boy._id }, {
                    state: 3,
                }).exec();
            } else {
                await recordModel.update({ user: girl._id }, {
                    state: 3
                }).exec();
            }

        }

        console.log(boys, girls);
        res.render('admin', {
            loose: {
                boys,
                girls,

            },

            success: '匹配完成'
        })

    });

export { router as adminRouter };