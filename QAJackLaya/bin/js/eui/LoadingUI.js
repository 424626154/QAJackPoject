var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    LoadingUI.prototype.init = function () {
        var res = [
            { url: "res/atlas/comp.json", type: Laya.Loader.ATLAS },
            { url: "room_bg.png", type: Laya.Loader.IMAGE },
            { url: "res/atlas/game.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/chip.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/cards.json", type: Laya.Loader.ATLAS },
            { url: "res/atlas/head.json", type: Laya.Loader.ATLAS }
        ];
        //设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
        Laya.loader.load(res, null, Laya.Handler.create(this, this.onProgress, null, false));
    };
    //进度条发生变化的时候触发下面的方法
    LoadingUI.prototype.onChange = function (value) {
        //  console.log("进度: "+Math.floor(value*100)+"%");
    };
    LoadingUI.prototype.onProgress = function (value) {
        //console.log("加载了总文件的:"+pro*100+"%");
        this.bar.value = value;
        if (this.bar.value == 1) {
            //游戏主页面资源加载完成后执行这里的代码
            //console.log("游戏加载完成咯！！");
            //延迟1秒再显示游戏主页面
            this.bar.value = value;
            this.onLoad();
        }
    };
    //加载完成后的回调函数
    LoadingUI.prototype.onLoad = function () {
        // console.log("加载完成");
        // SocketManager.getInstance();
        // UIMgr.toUI(EUI.Test);
        UIMgr.toUI(3 /* Login */);
    };
    return LoadingUI;
}(ui.loadingUI));
//# sourceMappingURL=LoadingUI.js.map