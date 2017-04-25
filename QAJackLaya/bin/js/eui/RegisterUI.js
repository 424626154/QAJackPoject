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
        _this.close.on(Laya.Event.CLICK, _this, _this.onClose);
        _this.register.on(Laya.Event.CLICK, _this, _this.onRegister);
        return _this;
    }
    RegisterUI.prototype.onClose = function (e) {
        UIMgr.toUI(3 /* Login */);
    };
    RegisterUI.prototype.onRegister = function (e) {
        var uname = this.uname.text;
        var pwd = this.pwd.text;
        if (uname.length > 0 && pwd.length > 0) {
            var pars = new Array();
            pars.push(['uname', uname]);
            pars.push(['pwd', pwd]);
            var http = new HttpLaya(this.onRegisterCallback);
            http.sendPost(pars, "register");
        }
        else {
            console.log("参数错误");
        }
    };
    RegisterUI.prototype.onRegisterCallback = function (err, data) {
        if (err != null) {
            console.log('err:', err);
        }
        else {
            if (data.code == 200) {
                var token = data.token;
                var uid = data.uid;
            }
            else {
                console.log('code:', data.code);
            }
        }
    };
    return RegisterUI;
}(ui.registerUI));
//# sourceMappingURL=RegisterUI.js.map