// 程序入口
var GameMain = (function () {
    function GameMain() {
        Laya.init(768, 1024);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //调试面板
        Laya.Stat.show(0, 0);
        var loadingResArray = [
            { url: "res/atlas/loading.json", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(loadingResArray, Laya.Handler.create(this, this.onAssetsLoaded));
    }
    GameMain.prototype.onAssetsLoaded = function () {
        UIMgr.toUI(0 /* Loading */);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map