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
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map