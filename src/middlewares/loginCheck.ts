import express = require('express');
export function checkLogin(req: express.Request, res: express.Response, next) {
    if (res.locals.student) {
        next();
    } else {
        res.render('/signin', {
            error: '未登录'
        });
    }
}   