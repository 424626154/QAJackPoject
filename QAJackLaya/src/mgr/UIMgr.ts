/*
* UI管理器
*/
class UIMgr{
    //ui列表
    static uiArray:Array<View> = [];
    constructor(){

    }
    //添加ui
    static pushUI(ui:View):void{
        UIMgr.uiArray.push(ui);
    }

    static toUI(uiname:EUI):void{
        for(var i = 0 ; i < UIMgr.uiArray.length ; i ++){
             UIMgr.uiArray[i].removeSelf();
             UIMgr.uiArray[i].destroy();
         }
        var ui:View;
        switch(uiname){
            case EUI.Loading:
                ui = new LoadingUI();
                Laya.stage.addChild(ui);
                break;
            case EUI.Test:
                ui = new TestUI();
                Laya.stage.addChild(ui);
                break;
            case EUI.Room:
                ui = new RoomUI();
                Laya.stage.addChild(ui);
                break;
            case EUI.Login:
                ui = new LoginUI();
                Laya.stage.addChild(ui);
                break;
            case EUI.Register:
                ui = new RegisterUI();
                Laya.stage.addChild(ui);
                break;
           case EUI.CreateRoom:
                ui = new CreateRoomUI();
                Laya.stage.addChild(ui);
                break;
        }
        if(ui != undefined){
            UIMgr.pushUI(ui);
        }
    }
}