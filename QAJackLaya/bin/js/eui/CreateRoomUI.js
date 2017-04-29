var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var CreateRoomUI = (function (_super) {
    __extends(CreateRoomUI, _super);
    function CreateRoomUI() {
        var _this = _super.call(this) || this;
        _this.networkMgr = NetworkMgr.getInstance();
        _this.gameData = GameData.getInstance();
        _this.close.on(Laya.Event.CLICK, _this, function (e) {
            UIMgr.toUI(3 /* Login */);
        });
        _this.create.on(Laya.Event.CLICK, _this, function (e) {
            if (_this.roomid == 0) {
                _this.createRoom();
            }
            else {
                _this.joinRoom(_this.roomid);
            }
        });
        _this.join.on(Laya.Event.CLICK, _this, function (e) {
            _this.roomid = Number(_this.jroomid.text);
            _this.joinRoom(_this.roomid);
        });
        var uid = _this.gameData.user.uid;
        var pars = new Array();
        pars.push(['uid', uid]);
        var http = new HttpLaya(function (err, data) {
            if (err != null) {
                console.log('err:', err);
            }
            else {
                if (data.code == 200) {
                    var roomid = data.roomid;
                    _this.reloadCreateRoomUI(roomid);
                }
                else {
                    console.log("error code:", data.code);
                }
            }
        });
        http.sendPost(pars, "getroom");
        return _this;
    }
    CreateRoomUI.prototype.reloadCreateRoomUI = function (roomid) {
        this.roomid = roomid;
        this.croomid.text = roomid + '';
        if (roomid == 0) {
            this.create.label = '创建房间';
        }
        else {
            this.create.label = '返回房间';
        }
    };
    /**
     * 创建房间
     */
    CreateRoomUI.prototype.createRoom = function () {
        var _this = this;
        var uid = GameData.getInstance().user.uid;
        var pars = new Array();
        pars.push(['uid', uid]);
        var http = new HttpLaya(function (err, data) {
            if (err != null) {
                new JDialogUI(err).show();
            }
            else {
                if (data.code == Code.OK) {
                    var roomid = data.roomid;
                    _this.reloadCreateRoomUI(roomid);
                }
                else {
                    new JDialogUI(data.code).show();
                }
            }
        });
        http.sendPost(pars, "creatroom");
    };
    CreateRoomUI.prototype.joinRoom = function (roomid) {
        var _this = this;
        var token = this.gameData.user.token;
        var uid = this.gameData.user.uid;
        this.networkMgr.queryEntry(uid, function (host, port) {
            console.log(token, host, port);
            _this.networkMgr.entry(host, port, uid, roomid, function (data) {
                if (data.code == Code.OK) {
                    _this.networkMgr.initPushMsg();
                    console.log('data:', data);
                    _this.gameData.room.roomId = data.roomid;
                    _this.gameData.room.slocations = data.locations;
                    _this.gameData.room.myuid = data.user;
                    _this.gameData.room.clocations = DataUtil.locationsS2C(_this.gameData.room.slocations, _this.gameData.room.myuid);
                    UIMgr.toUI(2 /* Room */);
                }
                else {
                    console.error('error code:', data.code);
                }
            });
        });
    };
    return CreateRoomUI;
}(ui.createroomUI));
//# sourceMappingURL=CreateRoomUI.js.map