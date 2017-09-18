"use strict";

const router            = require('koa-router')();
const config            = require('../config');
const user    = require("../app/controllers/user");

router.get('/', function (ctx, next) {
	ctx.body = 'this a users response!';
});

router.get('register/:account/:password/:phone/:source', user.register);

router.get('login/:account/:password', user.login);

module.exports = router;
