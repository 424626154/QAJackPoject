var roomDao = module.exports;
var pomelo = require('pomelo');
var utils = require('../util/utils');
var dbclient = pomelo.app.get('dbclient');
var Redis = require('ioredis');
var redis = new Redis();



/**
 *加入房间
 */
roomDao.joinRoom = function(roomid, playerid, cb) {
    console.log("roomDao.joinRoom roomid:", roomid);
    var sql = "select * from room where room_id = ?";
    var args = [roomid];
    dbclient.query(sql, args, function(err, res) {
        if (err != null) {
            console.log("roomDao.joinRoom Error:", err);
            utils.invokeCallback(cb, err, null);
        } else {
            console.log("roomDao.joinRoom Success:", res.length);
            var player_num = 0;
            if (res.length == 0) {
                sql = "insert into room (room_id,location1,player_num) values (?,?,?)";
                player_num = 1;
                args = [roomid, playerid, player_num];

            } else {
                var room = res[0];
                if (room.location1 == playerid || room.location2 == playerid || room.location3 == playerid || room.location4 == playerid || room.location5 == playerid) {
                    utils.invokeCallback(cb, null, res);
                    return;
                }

                player_num = room.player_num + 1;
                var location = "";
                if (room.location1 == null || room.location1 == "") {
                    location = "location1";
                } else if (room.location2 == null || room.location2 == "") {
                    location = "location2";
                } else if (room.location3 == null || room.location3 == "") {
                    location = "location3";
                } else if (room.location4 == null || room.location4 == "") {
                    location = "location4";
                } else if (room.location5 == null || room.location5 == "") {
                    location = "location5";
                }
                sql = "update room set " + location + " = ? , player_num = ? where room_id = ?";
                args = [playerid, player_num, roomid]
            }
            dbclient.query(sql, args, function(err, res) {
                if (err != null) {
                    console.log("roomDao.joinRoom Error:", err);
                    utils.invokeCallback(cb, err, null);
                } else {
                    utils.invokeCallback(cb, null, res);
                }
            });

        }
    });
    // var timeout = 100;
    // var key = "test";
    // redis.select(9, function(err) {
    //     console.log('redis select9 err:', err);
    //     redis.multi()
    //         .set(key, 'test')
    //         .expire(key, timeout)
    //         .exec(function(err) {
    //             console.log("redis select9 :", key, timeout);

    //         });
    // });
}


roomDao.getPlayer = function(roomid, cb) {
    var sql = "select * from room where room_id = ?";
    var args = [roomid];
    dbclient.query(sql, args, function(err, res) {
        if (err != null) {
            console.log("roomDao.joinRoom Error:", err);
            utils.invokeCallback(cb, err, null);
        } else {
            var room = res[0];
            var roomid = room.room_id;
            var player_num = room.player_num;
            var locations = [];
            locations[0] = room.location1;
            locations[1] = room.location2;
            locations[2] = room.location3;
            locations[3] = room.location4;
            locations[4] = room.location5;
            utils.invokeCallback(cb, null, roomid, locations);
        }
    });
}

roomDao.removeRoom = function(roomid, playerid, cb) {
    var sql = "select * from room where room_id = ?";
    var args = [roomid];
    dbclient.query(sql, args, function(err, res) {
        if (err != null) {
            console.log("roomDao.joinRoom Error:", err);
            utils.invokeCallback(cb, err, null);
        } else {
            if (res.length <= 0) {
                utils.invokeCallback(cb, null, res);
                return;
            }
            var room = res[0];
            var roomid = room.room_id;
            var player_num = room.player_num - 1;
            var location = "";
            console.log("remove playerid:", playerid);
            if (room.location1 == playerid) {
                location = "location1";
            } else if (room.location2 == playerid) {
                location = "location2";
            } else if (room.location3 == playerid) {
                location = "location3";
            } else if (room.location4 == playerid) {
                location = "location4";
            } else if (room.location5 == playerid) {
                location = "location5";
            }
            sql = "update room set " + location + " = ? , player_num = ? where room_id = ?";
            args = ["", player_num, roomid];
            console.log("remove sql:", sql);
            dbclient.query(sql, args, function(err, res) {
                if (err != null) {
                    console.log("roomDao.joinRoom Error:", err);
                    utils.invokeCallback(cb, err, null);
                } else {
                    utils.invokeCallback(cb, null, res);
                }
            });
        }
    });
}