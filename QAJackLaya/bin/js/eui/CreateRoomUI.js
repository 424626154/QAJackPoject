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
        var uid = GameData.getInstance().user.uid;
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
    CreateRoomUI.prototype.createRoom = function () {
        var _this = this;
        var uid = GameData.getInstance().user.uid;
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
        http.sendPost(pars, "creatroom");
    };
    CreateRoomUI.prototype.joinRoom = function (roomid) {
    };
    return CreateRoomUI;
}(ui.createroomUI));
//# sourceMappingURL=CreateRoomUI.js.map