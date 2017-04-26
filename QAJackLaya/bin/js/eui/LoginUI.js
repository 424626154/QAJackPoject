var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.login.on(Laya.Event.CLICK, _this, _this.onLogin);
        _this.register.on(Laya.Event.CLICK, _this, _this.onRegister);
        return _this;
    }
    LoginUI.prototype.onLogin = function () {
        var uname = this.uname.text;
        var pwd = this.pwd.text;
        if (uname.length != 0 && pwd.length != 0) {
            var pars = new Array();
            pars.push(['uname', uname]);
            pars.push(['pwd', pwd]);
            var http = new HttpLaya(function (err, data) {
                if (err != null) {
                    console.log('err:', err);
                }
                else {
                    if (data.code == 200) {
                        var token = data.token;
                        var uid = data.uid;
                        if (uid) {
                            UIMgr.toUI(5 /* CreateRoom */);
                            // NetworkMgr.getInstance().queryEntry(uid,(host:string,port:string)=>{
                            //     console.log(token,host,port);
                            //     NetworkMgr.getInstance().entry(host,port,token,()=>{
                            //     });
                            // });
                            GameData.getInstance().user.uid = uid;
                            GameData.getInstance().user.token = token;
                        }
                    }
                    else {
                        console.log('code:', data.code);
                    }
                }
            });
            http.sendPost(pars, "login");
        }
        else {
            console.log("参数错误");
        }
    };
    LoginUI.prototype.onRegister = function () {
        UIMgr.toUI(4 /* Register */);
    };
    return LoginUI;
}(ui.loginUI));
//# sourceMappingURL=LoginUI.js.map