var mysql = require('./mysql/mysql');
var userDao = module.exports;
var Code = require('../../../shared/code');

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
	var sql = 'select * from  User where name = ?';
  var args = [username];
	mysql.query(sql, args, function(err, res) {
			if(err){
				cb({
					code: err.number,
					msg: err.message
				}, null);
			}else{
				if(res.length > 0 ){
					cb({
						code:Code.USER_RXISTS_ERROR
					}, null);
				}else{
					sql = 'insert into User (name,password,fromType,loginCount,lastLoginTime) values(?,?,?,?,?)';
					args = [username, password, from || '', 1, loginTime];
					var loginTime = Date.now();

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
				}
			}
		});
};

userDao.createUserRoom = function(uid,cb){
	var sql = 'update User set roomId = ? where id = ?';
	var roomId = 0;
	for (var i = 0; i < 6; i++) {
		var max = 9;
		var min = 1;
		var ran = Math.floor(Math.random() * (max - min + 1) + min) * Math.pow(10, i);
		roomId += ran;
	}
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
