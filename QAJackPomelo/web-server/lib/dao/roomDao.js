var mysql = require('./mysql/mysql');
var roomDao = module.exports;


roomDao.createRoom = function(uid, cb) {
	var sql = "select * from Room where roomId = ?";
	var args = [uid];
	mysql.query(sql, args, function(err, res) {
		if (err != null) {
			console.log("roomDao.createRoom Error:", err);
			cb(err, null);
		} else {
			if (res != null && res.length > 0) {
				var roomId = res[0].roomId;
				cb(null, roomId);
				return;
			} else {
				var roomid = 123456;
				sql = "insert into Room (roomId,uid) values (?,?) ";
				args = [roomid, uid];
				mysql.query(sql, args, function(err, res) {
					if (err != null) {
						console.log("roomDao.createRoom Error:", err);
						cb(err, null);
					} else {
						cb(null, roomid);
						return;
					}
				});
			}
		}
	});
};


roomDao.getRoom = function(uid, cb) {
	var sql = "select * from Room where uid = ?";
	var args = [uid];
	mysql.query(sql, args, function(err, res) {
		if (err != null) {
			console.log("roomDao.getRoom Error:", err);
			cb(err, null);
		} else {
			console.log("roomDao.getRoom res:", res);
			if (res != null && res.length > 0) {
				var roomId = res[0].roomId;
				cb(null, roomId);
				return;
			} else {
				cb(null, 0);
				return;
			}
		}
	});
};