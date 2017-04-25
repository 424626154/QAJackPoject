// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(768,1024);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //调试面板
		Laya.Stat.show(0,0);
         var loadingResArray = [
            {url:"res/atlas/loading.json",type:Laya.Loader.ATLAS}
        ]
        Laya.loader.load(loadingResArray, Laya.Handler.create(this, this.onAssetsLoaded));
    }
    onAssetsLoaded():void{
        UIMgr.toUI(EUI.Loading);
    }
}
new GameMain();