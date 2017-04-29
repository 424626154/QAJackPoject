var roomDao = require('../../../dao/roomDao');
var Code = require('../../../../../shared/code');
var userDao = require('../../../dao/userDao');
var async = require('async');
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};
var handler = Handler.prototype;
/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
handler.entry = function(msg, session, next) {
	console.log('msg,:',msg);
	var self = this;
	var rid = msg.rid;
	var userid = msg.userid;
	var uid = userid + '*' + rid;
	roomDao.joinRoom(rid, userid, function(err, res) {
		// console.log("err:", err, "res:", res);
		session.bind(uid);
		session.set('rid', rid);
		session.push('rid', function(err) {
			if (err) {
				console.error('set rid for session service failed! error is : %j', err.stack);
			}
		});

		session.on('closed', onUserLeave.bind(null, self.app));
		self.app.rpc.room.roomRemote.add(session, uid, self.app.get('serverId'), rid, true, function(roomid, locations) {
			next(null, {
				code: Code.OK,
				roomid: roomid,
				user: uid,
				locations: locations
			});
		});
	});
};

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
	if (!session || !session.uid) {
		return;
	}
	app.rpc.room.roomRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
};
