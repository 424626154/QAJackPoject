/**
 * 创建时间 2017/04/16
 * 网络监听
 */
var NetworkEmitter = (function () {
    function NetworkEmitter() {
    }
    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    NetworkEmitter.register = function (name, callback, context) {
        var observers = NetworkEmitter.listeners[name];
        if (!observers) {
            NetworkEmitter.listeners[name] = [];
        }
        NetworkEmitter.listeners[name].push(new Observer(callback, context));
    };
    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    NetworkEmitter.remove = function (name, callback, context) {
        var observers = NetworkEmitter.listeners[name];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete NetworkEmitter.listeners[name];
        }
    };
    /**
     * 发送事件
     * @param name 事件名称
     */
    NetworkEmitter.fire = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = NetworkEmitter.listeners[name];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            observer.notify.apply(observer, [name].concat(args));
        }
    };
    return NetworkEmitter;
}());
/** 监听数组 */
NetworkEmitter.listeners = {};
/**
 * 观察者
 */
var Observer = (function () {
    function Observer(callback, context) {
        /** 回调函数 */
        this.callback = null;
        /** 上下文 */
        this.context = null;
        var self = this;
        self.callback = callback;
        self.context = context;
    }
    /**
     * 发送通知
     * @param args 不定参数
     */
    Observer.prototype.notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        (_a = self.callback).call.apply(_a, [self.context].concat(args));
        var _a;
    };
    /**
     * 上下文比较
     * @param context 上下文
     */
    Observer.prototype.compar = function (context) {
        return context == this.context;
    };
    return Observer;
}());
//# sourceMappingURL=NetworkEmitter.js.map