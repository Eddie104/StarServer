"use strict";

const config        = require('../../../config');
const mongoose      = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const options = {
	db: {native_parser: true},
	server: { 
		poolSize: 5 ,
		auto_reconnect: true,
		socketOptions: {keepAlive: 1}
	},
	useMongoClient: true
};

// if (require('os').platform() !== "win32") {
// 	autoIncrement.initialize(mongoose.connect(`mongodb://${config.MongoDB.USER}:${config.MongoDB.PWD}@${config.MongoDB.HOST}:${config.MongoDB.PORT}/${config.MongoDB.NAME}`), options);
// } else {
// 	autoIncrement.initialize(mongoose.connect(`mongodb://${config.MongoDB.HOST}:${config.MongoDB.PORT}/${config.MongoDB.NAME}`), options);
// }
autoIncrement.initialize(mongoose.connect(`mongodb://${config.MongoDB.HOST}:${config.MongoDB.PORT}/${config.MongoDB.NAME}`), options);

module.exports = autoIncrement;