"use strict";

const Koa        = require('koa');
const app        = new Koa();
const router     = require('koa-router')();
const views      = require('koa-views');
const co         = require('co');
const convert    = require('koa-convert');
const json       = require('koa-json');
const onerror    = require('koa-onerror');
const bodyparser = require('koa-bodyparser')({formLimit: '10000kb'});
const log4js     = require('log4js');
const cors       = require('kcors');

// log4js
require('./log4js_init');
app.logger = function (name){
	let logger = log4js.getLogger(name);
	logger.setLevel('DEBUG');
	return logger;
};

// db
require('./app/models/db');

const index         = require('./routes/index');
const users         = require('./routes/users');

// middlewares
app.use(cors());
app.use(convert(bodyparser));
app.use(convert(json()));
// 将log4js嵌入到koa中
app.use(convert(require('./koaLog4js')()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
	extension: 'jade'
}));

router.use('/', index.routes(), index.allowedMethods());
router.use('/users/', users.routes(), users.allowedMethods());
// router.use('/admin/', admin.routes(), admin.allowedMethods());
// router.use('/product/', product.routes(), product.allowedMethods());
// router.use('/easy/', easy.routes(), easy.allowedMethods());
// router.use('/picaFurniShow/', picaFurniShow.routes(), picaFurniShow.allowedMethods());
// router.use('/ads/', ads.routes(), ads.allowedMethods());
// router.use('/games/', games.routes(), games.allowedMethods());
// router.use('/sys/', sys.routes(), sys.allowedMethods());
// router.use('/root/', root.routes(), root.allowedMethods());
// router.use('/taoJinFarm/', taoJinFarm.routes(), taoJinFarm.allowedMethods());

app.use(router.routes(), router.allowedMethods());

// if (require('os').platform() !== "win32") {
// 	require('tingyun');
// }

app.on('error', function(err, ctx){
	app.logger('error').error('server error', err, ctx);
});

module.exports = app;