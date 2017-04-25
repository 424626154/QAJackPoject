/*
* name;
*/
class LoadingUI extends ui.loadingUI{
    constructor(){
        super();
        this.init();
    }
    init():void{
        var res:Array<any> = [ 
              {url:"res/atlas/comp.json",type:Laya.Loader.ATLAS},
              {url:"room_bg.png",type:Laya.Loader.IMAGE},
              {url:"res/atlas/game.json",type:Laya.Loader.ATLAS},
              {url:"res/atlas/chip.json",type:Laya.Loader.ATLAS},
              {url:"res/atlas/cards.json",type:Laya.Loader.ATLAS}
            ];

          //设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
          Laya.loader.load(res,null,Laya.Handler.create(this,this.onProgress,null,false));
    }
    //进度条发生变化的时候触发下面的方法
    onChange(value:number):void{
    //  console.log("进度: "+Math.floor(value*100)+"%");
    }
    onProgress(value:number):void{
       //console.log("加载了总文件的:"+pro*100+"%");
            this.bar.value=value;
            if(this.bar.value==1)
            {
                //游戏主页面资源加载完成后执行这里的代码
                //console.log("游戏加载完成咯！！");
                //延迟1秒再显示游戏主页面
                this.bar.value=value;
                this.onLoad(); 
            }
    }
    //加载完成后的回调函数
    onLoad():void{
        // console.log("加载完成");
        // SocketManager.getInstance();
        // UIMgr.toUI(EUI.Test);
        UIMgr.toUI(EUI.Login);
    }
}