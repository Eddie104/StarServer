/**
 * Module dependencies.
 */

const Counter  = require('passthrough-counter');
const humanize = require('humanize-number');
const bytes    = require('bytes');
const chalk    = require('chalk');
let log4js     = null;

/**
 * TTY check for dev format.
 */
// const isatty = process.stdout.isTTY;

/**
 * Expose logger.
 */
module.exports = dev;

function dev(opts) {
	return function *logger(next) {
		// request
		const start = new Date;
		if (!log4js) {
			log4js = require('./app').logger('info')
		}
		log4js.info('	<-- %s %s', this.method, this.originalUrl);

		try {
			yield next;
		} catch (err) {
			// log uncaught downstream errors
			log(this, start, null, err);
			throw err;
		}

		// calculate the length of a streaming response
		// by intercepting the stream with a counter.
		// only necessary if a content-length header is currently not set.
		const length = this.response.length;
		const body = this.body;
		let counter;
		if (null == length && body && body.readable) {
			this.body = body.pipe(counter = Counter()).on('error', this.onerror);
		}

		// log when the response is finished or closed,
		// whichever happens first.
		const ctx = this;
		const res = this.res;

		const onfinish = done.bind(null, 'finish');
		const onclose = done.bind(null, 'close');

		res.once('finish', onfinish);
		res.once('close', onclose);

		function done(event){
			res.removeListener('finish', onfinish);
			res.removeListener('close', onclose);
			log(ctx, start, counter ? counter.length : length, null, event);
		}
	};
}

/**
 * Log helper.
 */

function log(ctx, start, len, err, event) {
	// get the status code of the response
	const status = err ? (err.status || 500) : (ctx.status || 404);

	// get the human readable response length
	let length;
	if (~[204, 205, 304].indexOf(status)) {
		length = '';
	} else if (null == len) {
		length = '-';
	} else {
		length = bytes(len);
	}

	const upstream = err ? 'xxx' : event === 'close' ? '-x-' : '-->'
	if (!log4js) {
		log4js = require('./app').logger('info')
	}
	log4js.info('	%s %s %s %s %s %s', upstream, ctx.method, ctx.originalUrl, status, time(start), length);
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
	let delta = new Date - start;
	delta = delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's';
	return humanize(delta);
}