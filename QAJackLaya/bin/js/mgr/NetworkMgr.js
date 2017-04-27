/*
* 网络管理器
*/
var NetworkMgr = (function () {
    function NetworkMgr() {
        this.host = "127.0.0.1";
        this.post = 3014;
        this.initPomelo();
    }
    /**
     * 单例模式
     */
    NetworkMgr.getInstance = function () {
        if (NetworkMgr._instance == null) {
            NetworkMgr._instance = new NetworkMgr();
        }
        return NetworkMgr._instance;
    };
    /**
     * 初始化Pomelo
     */
    NetworkMgr.prototype.initPomelo = function () {
        var reg = this;
        this.pomelo = new PomeloLaya.Pomelo();
        this.pomelo.on(PomeloLaya.Pomelo.EVENT_IO_ERROR, function (event) {
            //错误处理
            console.error("error", event);
        });
        this.pomelo.on(PomeloLaya.Pomelo.EVENT_CLOSE, function (event) {
            //错误处理
            console.error("error", event);
            reg.reconnectionPomelo();
        });
    };
    /**
     * 初始化推送信息
     */
    NetworkMgr.prototype.setPushMsg = function (type) {
        this.pomelo.on(type, function (event) {
            //错误处理
            console.error("push msg type:", type, "data:", event);
            NetworkEmitter.fire(type, event);
        });
    };
    /**
     * 连接Pomelo
     */
    NetworkMgr.prototype.onQueryEntry = function (uid, rid, callback) {
        var reg = this;
        this.pomelo.init({
            host: this.host,
            port: this.post
        }, function (result) {
            //连接成功执行函数
            console.log("link success result:", result);
            if (result.code == 200) {
                var route = "gate.gateHandler.queryEntry";
                var msg = {
                    uid: uid
                };
                reg.pomelo.request(route, msg, function (result) {
                    if (result.code == 2001) {
                        console.log("Servers error!");
                        return;
                    }
                    if (result.code == 200) {
                        reg.pomelo.disconnect();
                        callback(reg, result.host, result.port, uid, rid);
                    }
                    else {
                        console.log("Servers error ! code:", result.code);
                    }
                });
            }
        });
    };
    /**
     * 断开链接
     */
    NetworkMgr.prototype.disconnectPomelo = function () {
        this.pomelo.disconnect();
    };
    /**
     * 重连
     */
    NetworkMgr.prototype.reconnectionPomelo = function () {
    };
    NetworkMgr.prototype.queryEntry = function (uid, callback) {
        var _this = this;
        var init_par = {
            host: this.host,
            port: this.post
        };
        this.pomelo.init(init_par, function (result) {
            if (result.code == 200) {
                var route = "gate.gateHandler.queryEntry";
                var msg = {
                    uid: uid
                };
                _this.pomelo.request(route, msg, function (result) {
                    if (result.code == 2001) {
                        console.log("Servers error!");
                        return;
                    }
                    if (result.code == 200) {
                        _this.pomelo.disconnect();
                        callback(result.host, result.port);
                    }
                    else {
                        console.log("Servers error ! code:", result.code);
                    }
                });
            }
        });
    };
    NetworkMgr.prototype.entry = function (host, port, uid, rid, callback) {
        var _this = this;
        var init_par = {
            host: host,
            port: port
        };
        this.pomelo.init(init_par, function (result) {
            _this.pomelo.request('connector.entryHandler.entry', { uid: uid, rid: rid }, function (data) {
                callback(data);
            });
        });
    };
    return NetworkMgr;
}());
NetworkMgr._instance = null;
/**加入房间推送 */
NetworkMgr.PUSH_MSG_JOIN = "onJoin";
/**开始游戏 */
NetworkMgr.PUSH_MSG_START = "onStart";
/**退出游戏 */
NetworkMgr.PUSH_MSG_BACK = "onBack";
/** 发牌 */
NetworkMgr.PUSH_MSG_DEAL = "onDeal";
NetworkMgr.MSG_LOOKCARDS = "LookCards";
//# sourceMappingURL=NetworkMgr.js.map