"use strict";

const router = require('koa-router')();
const config = require('../config');
const admin  = require("../app/controllers/admin");

router.get('/', function (ctx, next) {
	ctx.body = 'this a admin response!';
});

// router.get('register/:account/:password/:phone/:source', user.register);

router.get('login/:account/:password', admin.login);

router.get('getAccountData/:page/:count', admin.getAccountData);
router.get('getAccountData/:page/:count/:source', admin.getAccountData);

module.exports = router;