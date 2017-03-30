
import express = require('express');
import { checkParamsFromBody } from '../middlewares/index';
import { userModel, IUser, recordModel, IRecord } from '../models';
import gravatar = require('gravatar');

var router = express.Router();



router.route('/')
    .get((req, res, next) => {
        res.render('signup', {
            tags: [{
                title: '个性签名',
                name: 'signature',
                values: [],
                options: ['文艺青年', '普通青年', '有为青年', '2B青年',
                    '学生', 'IT民工', '自由职业者', '上班族', '潜力股',
                    '创业者', '技术宅', '小清新', '月光族', '乐活族']
            },
            {
                title: '我的兴趣爱好',
                name: 'intersting',
                values: [],
                options: ['K歌', '旅行', '果粉', '购物狂', '美食', '美食', '电影', '摄影', '游戏', '手机控', '读书', '动漫', '爱狗', '爱猫', '运动', '电视剧', '桌游']
            },
            {
                title: '我的个性',
                name: 'like',
                values: [],
                options: ['K歌', '旅行', '果粉', '购物狂', '美食', '美食', '电影', '摄影', '游戏', '手机控', '读书', '动漫', '爱狗', '爱猫', '运动', '电视剧', '桌游']
            },
            {
                title: '我现在的状态',
                name: 'state',
                values: [],
                options: ['起床困难户', '奋斗ing', '加班ing', '学习ing', '减肥ing', '寂寞ing', '缺爱ing', '成长ing']
            }
            ],
            questions: [{
                title: '我看过的一部深有感触的电影',
                name: 'movie',
                anwser: '曾经看过《初恋50次》，很轻松很浪漫，温馨感动、每天都有激情，每天都是新鲜的，虽然余生都只能靠记忆延续，但生命因此而充实。'
            }, {
                title: '最近爱听的一首歌',
                name: 'loveSong',
                anwser: '最近特别爱听《凉凉》，大爱古风，歌词好美，最爱那句“若回忆终不能相认，就让情分落九尘”'
            }, {
                title: '心中男神/女神',
                name: 'god',
                anwser: '有一种相遇，一眼凝神，便是永恒；有一种心动，一生一次，只为一人，胡歌无可替代。'
            }, {
                title: '曾经看过的一本书',
                name: 'book',
                anwser: '曾经看过《我心深处》，觉得世界很可悲，但人总要创造点什么价值来，虽然没什么用，但总是要活下去！'
            }, {
                title: '心目中理想的Ta',
                name: 'ta',
                anwser: '希望他是一个有趣的人，能和我来一次灵魂深处的交流！'
            }, {
                title: '我的爱情宣言',
                name: 'words',
                anwser: '不忘初心，方得始终'
            }, {
                title: '为什么想参加恋爱体验站活动?',
                name: 'reason',
                anwser: '相遇就是一场缘分，希望通过这种奇妙的相遇，谈一场不分手的恋爱！'
            }]
        });
    })
    .post(checkParamsFromBody('name', 'phone', 'gender', 'age',
        'signature', 'intersting', 'like', 'movie', 'loveSong', 'god',
        'book', 'ta', 'words', 'reason',
        'filterAge', 'filterCity'
    ),
    async (req, res, next) => {
        var { name, phone, gender, age, signature, intersting, like, movie, loveSong, god, book, ta, words, reason, filterAge, filterCity } = req.body;
        var user = await new userModel({
            name, phone, gender, age, signature, intersting, like, movie,
            loveSong, god, book, ta, words, reason, filterAge, filterCity
        }).save();
        var record = await new recordModel({ state: 0, user: user._id }).save();
        // 创建一条纪录
        req.session.user = user;
        res.redirect('/');

    });


export { router as signupRouter };