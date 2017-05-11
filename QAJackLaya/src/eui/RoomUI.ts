/*
* name;
*/
class RoomUI extends ui.roomUI{

    gamedata:GameData;
    /**玩家数组 */
    pucArray:Array<PlayerController> ;
    /**玩家按钮 */
    ubcArray:Array<UButController> ;
    npcCon:NpcController;


    palyerNum:number ;
    constructor(){
        super();
        this.gamedata = GameData.getInstance();
        this.initUI();
        this.registerPushs();
    }
    destroy(){
        this.removePushs();
    }
    /**
     * 初始化UI
     */
    initUI():void{
        this.initPlayerUI();
        if(this.gamedata.room.clocations != null){
            var clocations = this.gamedata.room.clocations;
            for(var i = 0 ; i < this.pucArray.length;i++){
                var puc = this.pucArray[i];
                var player = new Player();
                if(clocations[i] != null&&clocations[i] != 0){
                    player.isSitDown = true;
                    player.uid = clocations[i];
                }else{
                    player.isSitDown = false;
                }
                puc.setPlayer(player);
            }
        }

        this.initUBut();

        this.menu.visible = false;
        this.fanhui.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            console.log("fanhui");
            this.menu.visible = false;
             NetworkMgr.getInstance().disconnectPomelo();
            UIMgr.toUI(EUI.CreateRoom);
        });
        this.zhanqi.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            console.log("huanzhuo");
            this.menu.visible = false;
        });
        this.huanzhuo.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            console.log("huanzhuo");
            this.menu.visible = false;
        });
        this.showmenu.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            // if(this.menu.visible){
            //     this.menu.visible = false;
            // }else{
            //     this.menu.visible = true;
            //     this.showmenu
            // }
            this.menu.visible = !this.menu.visible;
            // this.openUbutAni();
        });

        this.npcCon = new NpcController(this);        
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
        this.ubcArray.push(new UButController(this.ubut02,this.ubut02.x,this.ubut02.y));
        this.ubcArray.push(new UButController(this.ubut03,this.ubut03.x,this.ubut03.y));
        this.ubcArray.push(new UButController(this.ubut04,this.ubut04.x,this.ubut04.y));
        this.ubcArray.push(new UButController(this.ubut05,this.ubut05.x,this.ubut05.y));


        this.ubut01.on(Laya.Event.CLICK,this,this.onClickUBut01);
        this.ubut02.on(Laya.Event.CLICK,this,this.onClickUBut02);
        this.ubut03.on(Laya.Event.CLICK,this,this.onClickUBut03);
        this.ubut04.on(Laya.Event.CLICK,this,this.onClickUBut04);
        this.ubut05.on(Laya.Event.CLICK,this,this.onClickUBut05);
        for(var i = 0 ; i < this.ubcArray.length;i++){
            this.ubcArray[i].ubutton.x = this.ubcArray[i].endX;
            this.ubcArray[i].ubutton.y = this.ubcArray[i].endY;
            this.ubcArray[i].ubutton.visible = false;
            this.ubcArray[i].isOpen = false;
        }
    }

    /**
     * 注册推送
     */
    registerPushs():void{
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_JOIN,this.onPushMsgJoin,this);
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_BACK,this.onPushMsgBack,this);
        NetworkEmitter.register(NetworkMgr.PUSH_MSG_START,this.onPushMsgStart,this);
    }

    removePushs():void{
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_JOIN,this.onPushMsgJoin,this);
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_BACK,this.onPushMsgBack,this);
        NetworkEmitter.remove(NetworkMgr.PUSH_MSG_START,this.onPushMsgStart,this);
    }

    onPushMsgJoin(eventName:string,data:any){
         console.log("onPushMsgJoin",eventName, 'data:',data);
         var roomid = data.roomid;
         var user = data.user;
         var slocations = data.locations;
         if(roomid == this.gamedata.room.roomId&&user != this.gamedata.user.uid){
            var showindex =  DataUtil.locationsAddS2C(slocations,this.gamedata.room.clocations,user,this.gamedata.user.uid);
            var player = new Player();
            var puc = this.pucArray[showindex];
                if(this.gamedata.room.clocations[showindex] != null&&this.gamedata.room.clocations[showindex] != 0){
                    player.isSitDown = true;
                    player.uid = this.gamedata.room.clocations[showindex];
                }else{
                    player.isSitDown = false;
                }
                puc.setPlayer(player);
        }
    }
    /**
     * 退出房间
     */
    onPushMsgBack(eventName:string,data:any){
        console.log("onPushMsgJoin",eventName, 'data:',data);
        var roomid = data.roomid;
        var user = data.user;
        if(roomid == this.gamedata.room.roomId){
            var removeIndex = -1;
            for(var i = 0;i< this.gamedata.room.clocations.length;i++){
                if(this.gamedata.room.clocations[i] == user){
                    this.gamedata.room.clocations[i] = 0;
                    removeIndex = i ;
                    break;
                }
            }
            if(removeIndex != -1){
                var puc = this.pucArray[removeIndex];
                var player = new Player();
                player.isSitDown = false;
                puc.setPlayer(player);
            }
        }
    }
    /**开始发牌 */
    onPushMsgStart(eventName:string,data:any):void{
        // console.log("onPushMsgJoin",eventName, 'data:',data);
        this.npcCon.firstDealCards();
        var startUid = data.startUid;
        Laya.timer.once(500,this,this.startCountDownIndex,[startUid]);
    }
    //初始化倒计时索引
    startCountDownIndex(startUid:number):void{
        var countdownindex = -1;
        for(var i = 0 ; i < this.gamedata.room.clocations.length ; i ++){
            if(this.gamedata.room.clocations[i] == startUid){
                countdownindex = i;
                break;
            }
        }
        console.log('countdownindex:',countdownindex);
        this.gamedata.room.countdownindex = countdownindex;
        var user = this.pucArray[countdownindex];
        user.startTimeCD();
        if(startUid == this.gamedata.room.myuid){
            this.openUbutAni();
        }
        // user.xian.visible = true;
        // Laya.timer.once(1000,this,this.hideXian,[user.xian]);
    }
    /****** click事件监听******/

    onClickUBut01(e:Laya.Event):void{
        console.log("onClickUBut01");
        // this.ubutAni(0);
        this.retractUbutAin();
        // this.pucArray[0].startTimeCD();
    }
    onClickUBut02(e:Laya.Event):void{
        console.log("onClickUBut02");
        this.retractUbutAin();
        // this.ubutAni(1);
        // this.npcCon.addChip(100,this.pucArray[0].playerui);
    }
    onClickUBut03(e:Laya.Event):void{
        console.log("onClickUBut03");
        this.retractUbutAin();
        // this.ubutAni(2);
        // this.npcCon.getAllChip(this.pucArray[1].playerui);
    }
    onClickUBut04(e:Laya.Event):void{
        console.log("onClickUBut04");
        this.retractUbutAin();
        // this.ubutAni(3);
        // this.npcCon.dealCards(this.pucArray[4]);
    }
    onClickUBut05(e:Laya.Event):void{
        console.log("onClickUBut05");
        this.retractUbutAin();
    //    this.pucArray[4].discardCards();
        // this.ubutAni(4);
    }
    /****** click事件监听******/

    /****** animation事件监听******/

    openUbutAni(){
        for(var i = 0 ; i < this.ubcArray.length;i++){
            this.ubcArray[i].ubutton.visible = true;
            this.ubutAni(i);
        }
    }
    retractUbutAin(){
        for(var i = 0 ; i < this.ubcArray.length;i++){
            this.ubutAni(i);
        }
    }

    ubutAni(index:number):void{
        var ubut = this.ubcArray[index]
        var toX = ubut.endX;
        var toY = ubut.endY;
        if(ubut.isOpen == false){
            toX = ubut.startX;
            toY = ubut.startY;
        }else{
            toX = ubut.endX;
            toY = ubut.endY;
        }
        Laya.Tween.to(ubut.ubutton, { x: toX,y:toY}, JConfig.aniUButTime,null, Laya.Handler.create(this, this.onUbutaniComplete, [ubut]));
    }
    onUbutaniComplete(ubuttonUI:UButController):void{
        console.log("onUbutaniComplete");
        ubuttonUI.isOpen = !ubuttonUI.isOpen;
        ubuttonUI.ubutton.visible = ubuttonUI.isOpen;
    }
    /****** animation事件监听******/
}