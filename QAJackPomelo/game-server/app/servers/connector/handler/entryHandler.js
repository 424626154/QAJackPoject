var roomDao = require('../../../dao/roomDao');
var Code = require('../../../../../shared/code');
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
handler.enter = function(msg, session, next) {
	var self = this;
	var roomid = msg.roomid;
	var username = msg.username;
	var uid = username + "*" + roomid;
	var rid = roomid;
	console.log("msg:", msg);
	roomDao.joinRoom(roomid, username, function(err, res) {
		// console.log("err:", err, "res:", res);
		session.bind(uid);
		session.set('rid', roomid);
		session.push('rid', function(err) {
			if (err) {
				console.error('set rid for session service failed! error is : %j', err.stack);
			}
		});

		session.on('closed', onUserLeave.bind(null, self.app));
		self.app.rpc.room.roomRemote.add(session, uid, self.app.get('serverId'), rid, true, function(roomid, locations) {
			next(null, {
				code: 0,
				roomid: roomid,
				user: username,
				locations: locations
			});
		});
	});
};

/**
 * New client entry game server. Check token and bind user info into session.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.entry = function(msg, session, next) {
	var token = msg.token,
		self = this;

	if (!token) {
		next(new Error('invalid entry request: empty token'), {
			code: Code.FAIL
		});
		return;
	}

	var uid, players, player;
	async.waterfall([
		function(cb) {
			// auth token
			self.app.rpc.auth.authRemote.auth(session, token, cb);
		},
		function(code, user, cb) {
			// query player info by user id
			if (code !== Code.OK) {
				next(null, {
					code: code
				});
				return;
			}

			if (!user) {
				next(null, {
					code: Code.ENTRY.FA_USER_NOT_EXIST
				});
				return;
			}

			uid = user.id;
			userDao.getPlayersByUid(user.id, cb);
		},
		function(res, cb) {
			// generate session and register chat status
			players = res;
			self.app.get('sessionService').kick(uid, cb);
		},
		function(cb) {
			session.bind(uid, cb);
		},
		function(cb) {
			if (!players || players.length === 0) {
				next(null, {
					code: Code.OK
				});
				return;
			}

			player = players[0];

			session.set('serverId', self.app.get('areaIdMap')[player.areaId]);
			session.set('playername', player.name);
			session.set('playerId', player.id);
			session.on('closed', onUserLeave.bind(null, self.app));
			session.pushAll(cb);
		},
		function(cb) {
			self.app.rpc.room.roomRemote.add(session, player.userId, player.name,
				channelUtil.getGlobalChannelName(), cb);
		}
	], function(err) {
		if (err) {
			next(err, {
				code: Code.FAIL
			});
			return;
		}

		next(null, {
			code: Code.OK,
			player: players ? players[0] : null
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