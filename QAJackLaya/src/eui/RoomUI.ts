/*
* name;
*/
class RoomUI extends ui.roomUI{
    /**玩家数组 */
    pucArray:Array<PlayerController> ;
    ubcArray:Array<UButController> ;
    npcCon:NpcController;


    palyerNum:number ;
    constructor(){
        super();
        this.initUI();
    }
    /**
     * 初始化UI
     */
    initUI():void{
        this.initPlayerUI();
        this.initUBut();
        this.npcCon = new NpcController(this);

        for(var i = 0 ;i < this.pucArray.length ; i ++ ){
            this.pucArray[i].playerui.uname.text = "name"+i;
        }
        

        this.npcCon.initCards();
    }
    /**
     * 初始化玩家UI
     */
    initPlayerUI():void{
        this.pucArray = new Array();
        this.pucArray.push(new PlayerController(this.player01,DesktopLocation.LeftUp));
        this.pucArray.push(new PlayerController(this.player02,DesktopLocation.LeftDown));
        this.pucArray.push(new PlayerController(this.player03,DesktopLocation.Down));
        this.pucArray.push(new PlayerController(this.player04,DesktopLocation.RightUp));
        this.pucArray.push(new PlayerController(this.player05,DesktopLocation.RightDown));
    }
    /**
     * 初始化玩家扇形按钮
     */
    initUBut():void{
              //初始化用户按钮
        this.ubcArray = new Array();
        this.ubcArray.push(new UButController(this.ubut01,this.ubut01.x,this.ubut01.y));
        this.ubcArray.push(new UButController(this.ubut02,this.ubut01.x,this.ubut02.y));
        this.ubcArray.push(new UButController(this.ubut03,this.ubut01.x,this.ubut03.y));
        this.ubcArray.push(new UButController(this.ubut04,this.ubut01.x,this.ubut04.y));
        this.ubcArray.push(new UButController(this.ubut05,this.ubut01.x,this.ubut05.y));


        this.ubut01.on(Laya.Event.CLICK,this,this.onClickUBut01);
        this.ubut02.on(Laya.Event.CLICK,this,this.onClickUBut02);
        this.ubut03.on(Laya.Event.CLICK,this,this.onClickUBut03);
        this.ubut04.on(Laya.Event.CLICK,this,this.onClickUBut04);
        this.ubut05.on(Laya.Event.CLICK,this,this.onClickUBut05);
    }



    /****** click事件监听******/

    onClickUBut01(e:Laya.Event):void{
        console.log("onClickUBut01");
        // this.ubutAni(0);
        this.pucArray[0].startTimeCD();
    }
    onClickUBut02(e:Laya.Event):void{
        console.log("onClickUBut02");
        // this.ubutAni(1);
        this.npcCon.addChip(100,this.pucArray[0].playerui);
    }
    onClickUBut03(e:Laya.Event):void{
        console.log("onClickUBut03");
        // this.ubutAni(2);
        this.npcCon.getAllChip(this.pucArray[1].playerui);
    }
    onClickUBut04(e:Laya.Event):void{
        console.log("onClickUBut04");
        // this.ubutAni(3);
        this.npcCon.dealCards(this.pucArray[4]);
    }
    onClickUBut05(e:Laya.Event):void{
        console.log("onClickUBut05");
       this.pucArray[4].discardCards();
        // this.ubutAni(4);
    }
    /****** click事件监听******/

    /****** animation事件监听******/

    ubutAni(index:number):void{
        var ubut = this.ubcArray[index]
        var toX = ubut.endX;
        var toY = ubut.endY;
        if(ubut.isOpen == false){
            toX = ubut.startX;
            toY = ubut.startY;
        }
        Laya.Tween.to(ubut.ubutton, { x: toX,y:toY}, JConfig.aniUButTime,null, Laya.Handler.create(this, this.onUbutaniComplete, [ubut]));
    }
    onUbutaniComplete(ubuttonUI:UButController):void{
        console.log("onUbutaniComplete");
    }
    /****** animation事件监听******/
}