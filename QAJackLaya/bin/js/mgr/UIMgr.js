/*
* UI管理器
*/
var UIMgr = (function () {
    function UIMgr() {
    }
    //添加ui
    UIMgr.pushUI = function (ui) {
        UIMgr.uiArray.push(ui);
    };
    UIMgr.toUI = function (uiname) {
        for (var i = 0; i < UIMgr.uiArray.length; i++) {
            UIMgr.uiArray[i].removeSelf();
            UIMgr.uiArray[i].destroy();
        }
        var ui;
        switch (uiname) {
            case 0 /* Loading */:
                ui = new LoadingUI();
                Laya.stage.addChild(ui);
                break;
            case 1 /* Test */:
                ui = new TestUI();
                Laya.stage.addChild(ui);
                break;
            case 2 /* Room */:
                ui = new RoomUI();
                Laya.stage.addChild(ui);
                break;
            case 3 /* Login */:
                ui = new LoginUI();
                Laya.stage.addChild(ui);
                break;
            case 4 /* Register */:
                ui = new RegisterUI();
                Laya.stage.addChild(ui);
                break;
            case 5 /* CreateRoom */:
                ui = new CreateRoomUI();
                Laya.stage.addChild(ui);
                break;
        }
        if (ui != undefined) {
            UIMgr.pushUI(ui);
        }
    };
    return UIMgr;
}());
//ui列表
UIMgr.uiArray = [];
//# sourceMappingURL=UIMgr.js.map