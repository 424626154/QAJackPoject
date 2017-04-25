var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var TestUI = (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    TestUI.prototype.init = function () {
        this.start.on(Laya.Event.CLICK, this, this.onStart);
    };
    TestUI.prototype.onStart = function (e) {
        var name = this.uname.text;
        var room = this.room.text;
        UIMgr.toUI(2 /* Room */);
        // if(name.length > 0 && room.length > 0 ){
        //     console.log("name:",name);
        //     NetworkMgr.getInstance().requestJoin(room,name);
        //     NetworkEmitter.register(NetworkMgr.PUSH_MSG_JOIN,this.onPushJoin,this);
        // }else{
        //     console.error("参数错误");
        // }
    };
    /**
     * 请求加入房间
     */
    TestUI.prototype.onPushJoin = function (type, data) {
        console.log("onRequestJoinCallback:", data);
        var code = data.code;
        if (code == 0) {
            var roomid = data.roomid;
            var user = data.user;
            var locations = data.locations;
            UIMgr.toUI(2 /* Room */);
        }
        else {
            var error = data.error;
            console.error(error);
        }
    };
    return TestUI;
}(ui.testUI));
//# sourceMappingURL=TestUI.js.map