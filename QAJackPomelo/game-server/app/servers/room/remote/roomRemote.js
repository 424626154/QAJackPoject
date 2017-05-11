/**
 * Created by wuningjian on 2/23/16.
 */
var roomDao = require('../../../dao/roomDao');
// var playerDao = require('../../../dao/playerDao');
// var pomelo = require('pomelo');
// var gameLogicRemote = require('./gameLogicRemote');
// var async = require('async');
// var cache = require('memory-cache');


module.exports = function(app) {
	return new RoomRemote(app);
};

var RoomRemote = function(app) {
	this.app = app;
	this.channelService = app.get('channelService');
	this.roomService = app.get('roomService');
};

/**
 * 房间新增用户
 */
RoomRemote.prototype.add = function(uid, sid, rid, flag, cb) {
	var channel = this.channelService.getChannel(rid, true);
	var channelService = this.channelService;
	var userid = uid.split('*')[0];
	var roomService = this.roomService;
	roomService.add(rid,userid,function(roomid, locations){
				var uids = channel.getMembers();
				console.log('udis:',uids);
				var param = {
					route: 'onJoin',
					roomid: roomid,
					user: userid,
					locations: locations //同时分配位置
				};
				console.log('推送 uids:',uids,'user',userid,'加入了房间',roomid);
				channel.pushMessage(param);

				channel.add(uid, sid);
				cb(roomid, locations);
			roomService.start(roomid,function (playerNum,startUid) {
				if(playerNum > 1){
					var uids = channel.getMembers();
					console.log('udis:',uids);
					var param = {
						route: 'onStart',
						roomid: roomid,
						playernum: playerNum,
						startUid:startUid
					};
					console.log('推送 uids:',uids,roomid,'房间开始了游戏');
					channel.pushMessage(param);
				}
			})
	});
	// //如果name不存在且flag为true，则创建channel
	// console.log('uid:',uid,"用户", userid, "加入了房间", rid);
	// var self = this;
	// if (!!channel) {
	// 	roomDao.getPlayer(rid, function(err, roomid, locations) {
	// 		var uids = channel.getMembers();
	// 		console.log('udis:',uids);
	// 		var param = {
	// 			route: 'onJoin',
	// 			roomid: roomid,
	// 			user: userid,
	// 			locations: locations //同时分配位置
	// 		};
	// 		console.log('推送 uids:',uids,'user',userid,'加入了房间',rid);
	// 		channel.pushMessage(param);
    //
	// 		channel.add(uid, sid);
	// 		cb(roomid, locations);
	// 	});
	// }
};

/**
 * 向playerID推送房间所有用户基本信息,room infomation
 * @param channelService
 * @param channel
 * @param uid 新进入房间的用户playerID*room_num
 */

RoomRemote.prototype.get = function(name, flag) {
	var users = [];
	var usersInfo = [];
	var channel = this.channelService.getChannel(name, flag);
	var channelService = this.channelService;

	var rid;

	if (!!channel) {
		users = channel.getMembers();
		rid = users[0].split('*')[1];
	}
	for (var i = 0; i < users.length; i++) {
		users[i] = users[i].split('*')[0];
	}
	// async.parallel([
	// 		function(callback) {
	// 			if (users[0] != null) {
	// 				playerDao.getPlayerByPlayerId(users[0], function(err, res) {
	// 					roomDao.getPlayerLocal(rid, users[0], function(err, location) {
	// 						var player1 = {
	// 							location: location,
	// 							nickName: res.nickName,
	// 							gold: res.gold,
	// 							vip: res.vip,
	// 							gender: res.gender,
	// 							level: res.level
	// 						};
	// 						callback(null, player1);
	// 					});
	// 				});

	// 			} else {
	// 				callback(null, 'null');
	// 			}
	// 		},
	// 		function(callback) {
	// 			if (users[1] != null) {
	// 				playerDao.getPlayerByPlayerId(users[1], function(err, res) {
	// 					roomDao.getPlayerLocal(rid, users[1], function(err, location) {
	// 						var player2 = {
	// 							location: location,
	// 							nickName: res.nickName,
	// 							gold: res.gold,
	// 							vip: res.vip,
	// 							gender: res.gender,
	// 							level: res.level
	// 						};
	// 						callback(null, player2);
	// 					});
	// 				});

	// 			} else {
	// 				callback(null, 'null');
	// 			}
	// 		},
	// 		function(callback) {
	// 			if (users[2] != null) {
	// 				playerDao.getPlayerByPlayerId(users[2], function(err, res) {
	// 					roomDao.getPlayerLocal(rid, users[2], function(err, location) {
	// 						var player3 = {
	// 							location: location,
	// 							nickName: res.nickName,
	// 							gold: res.gold,
	// 							vip: res.vip,
	// 							gender: res.gender,
	// 							level: res.level
	// 						};
	// 						callback(null, player3);
	// 					});
	// 				});

	// 			} else {
	// 				callback(null, 'null');
	// 			}
	// 		},
	// 		function(callback) {
	// 			if (users[3] != null) {
	// 				playerDao.getPlayerByPlayerId(users[3], function(err, res) {
	// 					roomDao.getPlayerLocal(rid, users[3], function(err, location) {
	// 						var player4 = {
	// 							location: location,
	// 							nickName: res.nickName,
	// 							gold: res.gold,
	// 							vip: res.vip,
	// 							gender: res.gender,
	// 							level: res.level
	// 						};
	// 						callback(null, player4);
	// 					});
	// 				});

	// 			} else {
	// 				callback(null, 'null');
	// 			}
	// 		},
	// 		function(callback) {
	// 			if (users[4] != null) {
	// 				playerDao.getPlayerByPlayerId(users[4], function(err, res) {
	// 					roomDao.getPlayerLocal(rid, users[4], function(err, location) {
	// 						var player5 = {
	// 							location: location,
	// 							nickName: res.nickName,
	// 							gold: res.gold,
	// 							vip: res.vip,
	// 							gender: res.gender,
	// 							level: res.level
	// 						};
	// 						callback(null, player5);
	// 					});
	// 				});

	// 			} else {
	// 				callback(null, 'null');
	// 			}
	// 		}
	// 	],
	// 	function(err, results) {
	// 		//console.log("async parallel"+JSON.stringify(results[0]));
	// 		//console.log("async parallel"+results);
	// 		//channelService.pushMessageByUids('onInit',results,[{uid:uid,sid:sid}]);
	// 		//return results;
	// 		cb(results);
	// 	});

	return users;
};

/**
 * 用户离开房间，剔除用户
 * */
RoomRemote.prototype.kick = function(uid, sid, name, cb) {
	var self = this;
	var channel = this.channelService.getChannel(name, false);
	var channelService = this.channelService;
	// leave channel
	var rid = uid.split('*')[1];
	var username = uid.split('*')[0];
	console.log("--------uid:" + uid);
	console.log("--------sid:" + sid);
	if (!!channel) {
		var users_ext = channel.getMembers();
		console.log("------------users_ext:" + users_ext);
		var abc = channel.leave(uid, sid);
		console.log("------------leave status:" + abc);
		var users = channel.getMembers();
		console.log("------------users:" + users);
	}
	console.log("玩家", username, "退出了房间", rid);
	this.roomService.leave(rid, username,function(uid,locations){
		var param = {
			route: 'onBack',
			roomid: rid,
			user: username,
		};
		channel.pushMessage(param);
		cb();
	})
	// roomDao.removeRoom(rid, username, function(err, res) {
		// if (err != null) {
        //
		// }
		// var param = {
		// 	route: 'onBack',
		// 	roomid: rid,
		// 	user: username,
		// };
		// channel.pushMessage(param);
		// cb();
	// });
	// roomDao.getPlayerLocal(rid, username, function(err, location) {
	// 	roomDao.cleanOpenMark(rid, location, function(err) {
	// 		roomDao.rmPlayer(rid, uid, function(err) {

	// 			var param = {
	// 				route: 'onLeave',
	// 				user: username
	// 			};
	// 			channel.pushMessage(param);

	// 			roomDao.getIsGameNum(rid, function(err, isGameNumArr) {
	// 				var sum = 0;
	// 				var game_winner;
	// 				for (var i = 1; i < 6; i++) {
	// 					if (isGameNumArr[i] == 1) {
	// 						sum = sum + isGameNumArr[i];
	// 						game_winner = i;
	// 					}
	// 				}
	// 				if (sum <= 1) {
	// 					//重新开始
	// 					gameLogicRemote.restartGame(self.app, uid, rid, channel, channelService, game_winner);
	// 					cb();

	// 				} else {
	// 					cb();
	// 				}
	// 			});
	// 		});
	// 	});
	// });


	// cb();
};
