var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RegisterUI = (function (_super) {
    __extends(RegisterUI, _super);
    function RegisterUI() {
        var _this = _super.call(this) || this;
        _this.gamedata = GameData.getInstance();
        _this.close.on(Laya.Event.CLICK, _this, _this.onClose);
        _this.register.on(Laya.Event.CLICK, _this, _this.onRegister);
        return _this;
    }
    RegisterUI.prototype.onClose = function (e) {
        UIMgr.toUI(3 /* Login */);
    };
    RegisterUI.prototype.onRegister = function (e) {
        var _this = this;
        var uname = this.uname.text;
        var pwd = this.pwd.text;
        if (uname.length > 0 && pwd.length > 0) {
            var pars = new Array();
            pars.push(['uname', uname]);
            pars.push(['pwd', pwd]);
            var http = new HttpLaya(function (err, data) {
                if (err) {
                    new JDialogUI(err).show();
                }
                else {
                    if (data.code == Code.OK) {
                        var token = data.token;
                        var uid = data.uid;
                        _this.gamedata.user.uid = uid;
                        _this.gamedata.user.token = token;
                        UIMgr.toUI(5 /* CreateRoom */);
                    }
                    else {
                        new JDialogUI(data.code).show();
                    }
                }
            });
            http.sendPost(pars, "register");
        }
        else {
            new JDialogUI("请输入用户名和密码").show();
        }
    };
    return RegisterUI;
}(ui.registerUI));
//# sourceMappingURL=RegisterUI.js.map