var mysql = require('./mysql/mysql');
var userDao = module.exports;

/**
 * Get userInfo by username
 * @param {String} username
 * @param {function} cb
 */
userDao.getUserByName = function(username, cb) {
	var sql = 'select * from  User where name = ?';
	var args = [username];
	mysql.query(sql, args, function(err, res) {
		if (err !== null) {
			cb(err.message, null);
		} else {
			if (!!res && res.length === 1) {
				var rs = res[0];
				var user = {
					id: rs.id,
					name: rs.name,
					password: rs.password,
					from: rs.fromType
				};
				cb(null, user);
			} else {
				cb(' user not exist ', null);
			}
		}
	});
};

/**
 * Create a new user
 * @param (String) username
 * @param {String} password
 * @param {String} from Register source
 * @param {function} cb Call back function.
 */
userDao.createUser = function(username, password, from, cb) {
	var sql = 'insert into User (name,password,fromType,loginCount,lastLoginTime) values(?,?,?,?,?)';
	var loginTime = Date.now();
	var args = [username, password, from || '', 1, loginTime];
	mysql.insert(sql, args, function(err, res) {
		if (err !== null) {
			cb({
				code: err.number,
				msg: err.message
			}, null);
		} else {
			var userId = res.insertId;
			var user = {
				id: res.insertId,
				name: username,
				password: password,
				loginCount: 1,
				lastLoginTime: loginTime
			};
			cb(null, user);
		}
	});
};

userDao.createUserRoom = function(uid,cb){
	var sql = 'update User set roomId = ? where id = ?';
	var roomId = 123456;
	var args = [roomId,uid];
	mysql.query(sql, args, function(err, res) {
		if (err !== null) {
			cb(err.message, null);
		} else {
			cb(null,roomId);
		}
	});
}

userDao.getUserRoom = function(uid,cb){
	var sql = 'select * from User where id = ?';
	var args = [uid];
	mysql.query(sql, args, function(err, res) {
		if (err !== null) {
			cb(err.message, null);
		} else {
			var user = res[0];
			var roomId = user.roomId;
			if(roomId == null){
				roomId = 0;
			}
			cb(null,roomId);
		}
	});
}
