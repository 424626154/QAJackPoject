var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RoomUI = (function (_super) {
    __extends(RoomUI, _super);
    function RoomUI() {
        var _this = _super.call(this) || this;
        _this.initUI();
        return _this;
    }
    /**
     * 初始化UI
     */
    RoomUI.prototype.initUI = function () {
        this.initPlayerUI();
        this.initUBut();
        this.npcCon = new NpcController(this);
        for (var i = 0; i < this.pucArray.length; i++) {
            this.pucArray[i].playerui.uname.text = "name" + i;
        }
        this.npcCon.initCards();
    };
    /**
     * 初始化玩家UI
     */
    RoomUI.prototype.initPlayerUI = function () {
        this.pucArray = new Array();
        this.pucArray.push(new PlayerController(this.player01, 0 /* LeftUp */));
        this.pucArray.push(new PlayerController(this.player02, 1 /* LeftDown */));
        this.pucArray.push(new PlayerController(this.player03, 4 /* Down */));
        this.pucArray.push(new PlayerController(this.player04, 2 /* RightUp */));
        this.pucArray.push(new PlayerController(this.player05, 3 /* RightDown */));
    };
    /**
     * 初始化玩家扇形按钮
     */
    RoomUI.prototype.initUBut = function () {
        //初始化用户按钮
        this.ubcArray = new Array();
        this.ubcArray.push(new UButController(this.ubut01, this.ubut01.x, this.ubut01.y));
        this.ubcArray.push(new UButController(this.ubut02, this.ubut01.x, this.ubut02.y));
        this.ubcArray.push(new UButController(this.ubut03, this.ubut01.x, this.ubut03.y));
        this.ubcArray.push(new UButController(this.ubut04, this.ubut01.x, this.ubut04.y));
        this.ubcArray.push(new UButController(this.ubut05, this.ubut01.x, this.ubut05.y));
        this.ubut01.on(Laya.Event.CLICK, this, this.onClickUBut01);
        this.ubut02.on(Laya.Event.CLICK, this, this.onClickUBut02);
        this.ubut03.on(Laya.Event.CLICK, this, this.onClickUBut03);
        this.ubut04.on(Laya.Event.CLICK, this, this.onClickUBut04);
        this.ubut05.on(Laya.Event.CLICK, this, this.onClickUBut05);
    };
    /****** click事件监听******/
    RoomUI.prototype.onClickUBut01 = function (e) {
        console.log("onClickUBut01");
        // this.ubutAni(0);
        this.pucArray[0].startTimeCD();
    };
    RoomUI.prototype.onClickUBut02 = function (e) {
        console.log("onClickUBut02");
        // this.ubutAni(1);
        this.npcCon.addChip(100, this.pucArray[0].playerui);
    };
    RoomUI.prototype.onClickUBut03 = function (e) {
        console.log("onClickUBut03");
        // this.ubutAni(2);
        this.npcCon.getAllChip(this.pucArray[1].playerui);
    };
    RoomUI.prototype.onClickUBut04 = function (e) {
        console.log("onClickUBut04");
        // this.ubutAni(3);
        this.npcCon.dealCards(this.pucArray[4]);
    };
    RoomUI.prototype.onClickUBut05 = function (e) {
        console.log("onClickUBut05");
        this.pucArray[4].discardCards();
        // this.ubutAni(4);
    };
    /****** click事件监听******/
    /****** animation事件监听******/
    RoomUI.prototype.ubutAni = function (index) {
        var ubut = this.ubcArray[index];
        var toX = ubut.endX;
        var toY = ubut.endY;
        if (ubut.isOpen == false) {
            toX = ubut.startX;
            toY = ubut.startY;
        }
        Laya.Tween.to(ubut.ubutton, { x: toX, y: toY }, JConfig.aniUButTime, null, Laya.Handler.create(this, this.onUbutaniComplete, [ubut]));
    };
    RoomUI.prototype.onUbutaniComplete = function (ubuttonUI) {
        console.log("onUbutaniComplete");
    };
    return RoomUI;
}(ui.roomUI));
//# sourceMappingURL=RoomUI.js.map