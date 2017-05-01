var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RoomUI = (function (_super) {
    __extends(RoomUI, _super);
    function RoomUI() {
        var _this = _super.call(this) || this;
        _this.gamedata = GameData.getInstance();
        _this.initUI();
        _this.registerPushs();
        return _this;
    }
    RoomUI.prototype.destroy = function () {
        this.removePushs();
    };
    /**
     * 初始化UI
     */
    RoomUI.prototype.initUI = function () {
        var _this = this;
        this.initPlayerUI();
        if (this.gamedata.room.clocations != null) {
            var clocations = this.gamedata.room.clocations;
            for (var i = 0; i < this.pucArray.length; i++) {
                var puc = this.pucArray[i];
                var player = new Player();
                if (clocations[i] != null && clocations[i] != 0) {
                    player.isSitDown = true;
                    player.uid = clocations[i];
                }
                else {
                    player.isSitDown = false;
                }
                puc.setPlayer(player);
            }
        }
        this.initUBut();
        this.menu.visible = false;
        this.fanhui.on(Laya.Event.CLICK, this, function (e) {
            console.log("fanhui");
            _this.menu.visible = false;
            NetworkMgr.getInstance().disconnectPomelo();
            UIMgr.toUI(5 /* CreateRoom */);
        });
        this.zhanqi.on(Laya.Event.CLICK, this, function (e) {
            console.log("huanzhuo");
            _this.menu.visible = false;
        });
        this.huanzhuo.on(Laya.Event.CLICK, this, function (e) {
            console.log("huanzhuo");
            _this.menu.visible = false;
        });
        this.showmenu.on(Laya.Event.CLICK, this, function (e) {
            // if(this.menu.visible){
            //     this.menu.visible = false;
            // }else{
            //     this.menu.visible = true;
            //     this.showmenu
            // }
            _this.menu.visible = !_this.menu.visible;
            // this.openUbutAni();
        });
        this.npcCon = new NpcController(this);
    };
    /**
     * 初始化玩家UI
     */
    RoomUI.prototype.initPlayerUI = function () {
        this.pucArray = new Array();
        this.pucArray.push(new PlayerController(this.player01, 0 /* LeftUp */));
        this.pucArray.push(new PlayerController(this.player02, 1 /* LeftDown */));
        this.pucArray.push(new PlayerController(this.player03, 4 /* Down */));
        this.pucArray.push(new PlayerController(this.player04, 2 /* RightUp */));
        this.pucArray.push(new PlayerController(this.player05, 3 /* RightDown */));
    };
    /**
     * 初始化玩家扇形按钮
     */
    RoomUI.prototype.initUBut = function () {
        //初始化用户按钮
        this.ubcArray = new Array();
        this.ubcArray.push(new UButController(this.ubut01, this.ubut01.x, this.ubut01.y));
        this.ubcArray.push(new UButController(this.ubut02, this.ubut02.x, this.ubut02.y));
        this.ubcArray.push(new UButController(this.ubut03, this.ubut03.x, this.ubut03.y));
        this.ubcArray.push(new UButController(this.ubut04, this.ubut04.x, this.ubut04.y));
        this.ubcArray.push(new UButController(this.ubut05, this.ubut05.x, this.ubut05.y));
        this.ubut01.on(Laya.Event.CLICK, this, this.onClickUBut01);
        this.ubut02.on(Laya.Event.CLICK, this, this.onClickUBut02);
        this.ubut03.on(Laya.Event.CLICK, this, this.onClickUBut03);
        this.ubut04.on(Laya.Event.CLICK, this, this.onClickUBut04);
        this.ubut05.on(Laya.Event.CLICK, this, this.onClickUBut05);
        for (var i = 0; i < this.ubcArray.length; i++) {
            this.ubcArray[i].ubutton.x = this.ubcArray[i].endX;
            this.ubcArray[i].ubutton.y = this.ubcArray[i].endY;
            this.ubcArray[i].ubutton.visible = false;
            this.ubcArray[i].isOpen = false;
        }
    };
    /**
     * 注册推送
     */
    RoomUI.prototype.registerPushs = function () {
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_JOIN, this.onPushMsgJoin, this);
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_BACK, this.onPushMsgBack, this);
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_START, this.onPushMsgStart, this);
    };
    RoomUI.prototype.removePushs = function () {
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_JOIN, this.onPushMsgJoin, this);
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_BACK, this.onPushMsgBack, this);
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_START, this.onPushMsgStart, this);
    };
    RoomUI.prototype.onPushMsgJoin = function (eventName, data) {
        console.log("onPushMsgJoin", eventName, 'data:', data);
        var roomid = data.roomid;
        var user = data.user;
        var slocations = data.locations;
        if (roomid == this.gamedata.room.roomId && user != this.gamedata.user.uid) {
            var showindex = DataUtil.locationsAddS2C(slocations, this.gamedata.room.clocations, user, this.gamedata.user.uid);
            var player = new Player();
            var puc = this.pucArray[showindex];
            if (this.gamedata.room.clocations[showindex] != null && this.gamedata.room.clocations[showindex] != 0) {
                player.isSitDown = true;
                player.uid = this.gamedata.room.clocations[showindex];
            }
            else {
                player.isSitDown = false;
            }
            puc.setPlayer(player);
        }
    };
    /**
     * 退出房间
     */
    RoomUI.prototype.onPushMsgBack = function (eventName, data) {
        console.log("onPushMsgJoin", eventName, 'data:', data);
        var roomid = data.roomid;
        var user = data.user;
        if (roomid == this.gamedata.room.roomId) {
            var removeIndex = -1;
            for (var i = 0; i < this.gamedata.room.clocations.length; i++) {
                if (this.gamedata.room.clocations[i] == user) {
                    this.gamedata.room.clocations[i] = 0;
                    removeIndex = i;
                    break;
                }
            }
            if (removeIndex != -1) {
                var puc = this.pucArray[removeIndex];
                var player = new Player();
                player.isSitDown = false;
                puc.setPlayer(player);
            }
        }
    };
    /**开始发牌 */
    RoomUI.prototype.onPushMsgStart = function (eventName, data) {
        // console.log("onPushMsgJoin",eventName, 'data:',data);
        this.npcCon.firstDealCards();
    };
    /****** click事件监听******/
    RoomUI.prototype.onClickUBut01 = function (e) {
        console.log("onClickUBut01");
        // this.ubutAni(0);
        this.retractUbutAin();
        // this.pucArray[0].startTimeCD();
    };
    RoomUI.prototype.onClickUBut02 = function (e) {
        console.log("onClickUBut02");
        this.retractUbutAin();
        // this.ubutAni(1);
        // this.npcCon.addChip(100,this.pucArray[0].playerui);
    };
    RoomUI.prototype.onClickUBut03 = function (e) {
        console.log("onClickUBut03");
        this.retractUbutAin();
        // this.ubutAni(2);
        // this.npcCon.getAllChip(this.pucArray[1].playerui);
    };
    RoomUI.prototype.onClickUBut04 = function (e) {
        console.log("onClickUBut04");
        this.retractUbutAin();
        // this.ubutAni(3);
        // this.npcCon.dealCards(this.pucArray[4]);
    };
    RoomUI.prototype.onClickUBut05 = function (e) {
        console.log("onClickUBut05");
        this.retractUbutAin();
        //    this.pucArray[4].discardCards();
        // this.ubutAni(4);
    };
    /****** click事件监听******/
    /****** animation事件监听******/
    RoomUI.prototype.openUbutAni = function () {
        for (var i = 0; i < this.ubcArray.length; i++) {
            this.ubcArray[i].ubutton.visible = true;
            this.ubutAni(i);
        }
    };
    RoomUI.prototype.retractUbutAin = function () {
        for (var i = 0; i < this.ubcArray.length; i++) {
            this.ubutAni(i);
        }
    };
    RoomUI.prototype.ubutAni = function (index) {
        var ubut = this.ubcArray[index];
        var toX = ubut.endX;
        var toY = ubut.endY;
        if (ubut.isOpen == false) {
            toX = ubut.startX;
            toY = ubut.startY;
        }
        else {
            toX = ubut.endX;
            toY = ubut.endY;
        }
        Laya.Tween.to(ubut.ubutton, { x: toX, y: toY }, JConfig.aniUButTime, null, Laya.Handler.create(this, this.onUbutaniComplete, [ubut]));
    };
    RoomUI.prototype.onUbutaniComplete = function (ubuttonUI) {
        console.log("onUbutaniComplete");
        ubuttonUI.isOpen = !ubuttonUI.isOpen;
        ubuttonUI.ubutton.visible = ubuttonUI.isOpen;
    };
    return RoomUI;
}(ui.roomUI));
//# sourceMappingURL=RoomUI.js.map