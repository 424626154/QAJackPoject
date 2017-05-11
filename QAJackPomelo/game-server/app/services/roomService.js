var Room = require('../domain/room');

var RoomService = function(app){
    this.app = app;
    this.uidMap = {};
    console.log('RoomService init');
//     var room = new Room();
//     room.roomId = 1000;
//     console.log('Room:',room);
}

module.exports = RoomService;

RoomService.prototype.add = function(roomid,userid,cb){
    var room;
    if(this.uidMap[roomid] == null){
        console.log('创建房间');
        room = new Room();
        room.roomId = roomid;
        room.deskPlayers[0] = userid;
        // room = {
        //     roomID:roomid,
        //     location1:userid,
        //     location2:0,
        //     location3:0,
        //     location4:0,
        //     location5:0,
        //     playerNum:1
        // }
        this.uidMap[roomid] = room;
    }else{
        room = this.uidMap[roomid];
        console.log('加入房间',userid);
        for(var i = 0 ; i < room.deskPlayers.length;i++){
            if(room.deskPlayers[i] == 0){
                console.log('room.deskPlayers:',i);
                room.deskPlayers[i] = userid;
                break;
            }
        }
        // if(room.location1 == 0){
        //     room.location1 = userid;
        //     room.playerNum += 1;
        // }else if(room.location2 == 0){
        //     room.location2 = userid;
        //     room.playerNum += 1;
        // }else if(room.location3 == 0){
        //     room.location3 = userid;
        //     room.playerNum += 1;
        // }else if(room.location4 == 0){
        //     room.location4 = userid;
        //     room.playerNum += 1;
        // }else if(room.location5 == 0){
        //     room.location5 = userid;
        //     room.playerNum += 1;
        // }
        this.uidMap[roomid] = room;
    }

    // console.log('room:',room);
    // var locations = [];
    // locations[0] = room.location1;
    // locations[1] = room.location2;
    // locations[2] = room.location3;
    // locations[3] = room.location4;
    // locations[4] = room.location5;
    cb(room.roomId,room.deskPlayers);
}

RoomService.prototype.leave = function(roomid,userid,cb){
    var room;
    if(this.uidMap[roomid]  != null){
        room = this.uidMap[roomid];
        for(var  i = 0 ; i < room.deskPlayers.length ; i++){
            if(room.deskPlayers[i] == userid){
                room.deskPlayers[i] = 0;
                break;
            }
        }
        // if(room.location1 == userid){
        //     room.location1 = 0;
        //     room.playerNum -= 1;
        // }else if(room.location2 == userid){
        //     room.location2 = 0;
        //     room.playerNum -= 1;
        // }else if(room.location3 == userid){
        //     room.location3 = 0;
        //     room.playerNum -= 1;
        // }else if(room.location4 == userid){
        //     room.location4 = 0;
        //     room.playerNum -= 1;
        // }else if(room.location5 == userid){
        //     room.location5 = 0;
        //     room.playerNum -= 1;
        // }
    }
    // console.log('room:',room);
    // var locations = [];
    // locations[0] = room.location1;
    // locations[1] = room.location2;
    // locations[2] = room.location3;
    // locations[3] = room.location4;
    // locations[4] = room.location5;
    // cb(roomid,locations);
    cb(room.roomId,room.deskPlayers);
}


RoomService.prototype.start = function (roomid,cb) {
    var room;
    if(this.uidMap[roomid]  != null) {
        room = this.uidMap[roomid];
        var playerNum = 0;
        var startUid = -1;
        for (var i = 0; i < room.deskPlayers.length; i++) {
            if (room.deskPlayers[i] != 0) {
                playerNum += 1;
            }
        }
        if (playerNum > 1) {
            console.log('开始发牌');
            var allPoker = []; //一副扑克
            //point点数，1开始
            //type类型，0黑桃，1红桃，2梅花，3方块，50小王，100大王
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 14; j++) {
                    allPoker.push({
                        "point": j,
                        "type": i
                    });
                }
            }
            //打乱牌顺序
            for (var i = 0; i < 3; i++) { //洗3遍
                allPoker.sort(function () {
                    return Math.random() > .5 ? -1 : 1
                });
            }
            console.log('size:', allPoker.length);
            room.startUid = -1;
            //初始为每个位置玩家发两张牌
            for (var i = 0; i < room.deskPlayers.length; i++) {
                if (room.deskPlayers[i] != 0) {
                    // console.log('room.deskPlayers:',i,room.deskPlayers[i]);
                    if(room.startUid == -1){//启始位置
                        room.startUid = room.deskPlayers[i];
                    }
                    for (var i = 0; i < 2; i++) {
                        room.playerPokers[i].push(allPoker.pop());
                    }
                }
            }
            // console.log('startUid:',startUid);
            startUid = room.startUid;
            room.pokers = allPoker;
            this.uidMap[roomid] = room;
        }
    }
    // console.log('room:', room);
    cb(playerNum,startUid);
}



