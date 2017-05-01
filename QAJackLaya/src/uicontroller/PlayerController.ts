/*
* name;
*/
class PlayerController{

    playerui:ui.playerUI;
    /**玩家坐在桌面上的位置 */
    dl:DesktopLocation;
    /**倒计时角度**/
    timeCDAngle:number;
    //当前用户的倒计时索引
    countdownindex:number;

    masksprite:Laya.Sprite;

    cardsArray:Array<CardsController>;

    currentCardsIndex:number;

    player:Player;

    hWidth:number;
    hHeight:number;

    constructor(playerui:ui.playerUI,dl:DesktopLocation){
        this.playerui = playerui;
        this.playerui.umask.visible = false;
        this.dl = dl;
        this.setMaker();
        this.cardsArray = new Array();
        this.currentCardsIndex = -1;
        this.hWidth = this.playerui.width;
        this.hHeight = this.playerui.height;
    }
    /**设置玩家 */
    setPlayer(player:Player){
        if(player.isSitDown){
            this.playerui.visible = true;
            this.playerui.uname.text = player.uid+'';
            this.playerui.head.width = this.playerui.head.width;
            this.playerui.head.height = this.playerui.head.height;
            this.playerui.head.skin = 'head/'+player.uid+'.png';
        }else{
            this.playerui.visible = false;
        }
    }

    setMaker():void{
        this.timeCDAngle = 0;
        //创建遮罩对象
        this.masksprite = new Laya.Sprite();
        //画一个圆形的遮罩区域
        // this.masksprite.graphics.drawPie(50,70,160,0,0,"#ff0000");
        this.playerui.umask.mask = this.masksprite;
    }
    startTimeCD():void{
        this.masksprite.graphics.clear();
        Laya.timer.loop(50,this,this.reloadTimeCD);
        this.playerui.umask.visible = true;
    }
    reloadTimeCD():void{
        this.timeCDAngle += JConfig.timeCDSpeed;
        if(this.timeCDAngle > 360){
            this.timeCDAngle = 0;
            this.endTimeCD();
            return;
        }
        this.masksprite.graphics.drawPie(50,70,160,270,270+this.timeCDAngle,"#ff0000");
    }
    endTimeCD():void{
        Laya.timer.clear(this,this.reloadTimeCD);
        this.playerui.umask.visible = false;
    }

    addCards(cards:CardsController,roomui:RoomUI):void{
        this.cardsArray.push(cards);
        for(var i = 0 ; i < this.cardsArray.length ;i++){
            if(i < this.cardsArray.length-1){
                var toX = this.getAddCardsItemX(i);
                var moveCards = this.cardsArray[i].cards;
                if(toX != moveCards.cards.x){
                    Laya.Tween.to(moveCards,{x:toX},JConfig.aniCardsTime);
                }
            }
            for(var j = i ; j < this.cardsArray.length ;j++){
                var cards0 = this.cardsArray[i].cards;
                var cards1 = this.cardsArray[j].cards;
                var index0 = roomui.getChildIndex(cards0);
                var index1 = roomui.getChildIndex(cards1);
                if (index0  > index1)
                    {
                        var temp:number = index0;
                        roomui.setChildIndex(cards0,index1);
                        roomui.setChildIndex(cards1,temp);
                    }
            }
        }
    }

    /**
     * 获得添加牌时每张牌的位置
     */
    getAddCardsItemX(index:number):number{
        var x = 0;
        var length = this.cardsArray.length;
        switch (this.dl) {
            case DesktopLocation.LeftUp:
                x = this.playerui.x+index*JConfig.cardsI;
                break;
            case DesktopLocation.LeftDown:
                x = this.playerui.x+index*JConfig.cardsI;
                break;
            case DesktopLocation.RightUp:
                x = this.playerui.x+this.playerui.width-JConfig.cardsW-(length-index-1)*JConfig.cardsI;
                break;
            case DesktopLocation.RightDown:
                x = this.playerui.x+this.playerui.width-JConfig.cardsW-(length-index-1)*JConfig.cardsI;
                break;
            case DesktopLocation.Down:
                var cardsAllW = JConfig.cardsW+(length-1)*JConfig.cardsI;
                x = (Laya.stage.width-cardsAllW)/2+index*JConfig.cardsI;
                break;
            default:
                break;
        }
        return x;
    }
    /**
     * 获得添加牌的位置
     */
    getAddCardsX():number{
        var x = 0;
        var length = this.cardsArray.length;
        switch (this.dl) {
            case DesktopLocation.LeftUp:
                x = this.playerui.x+length*JConfig.cardsI;
                break;
            case DesktopLocation.LeftDown:
                x = this.playerui.x+length*JConfig.cardsI;
                break;
            case DesktopLocation.RightUp:
                x = this.playerui.x+this.playerui.width-JConfig.cardsW;
                break;
            case DesktopLocation.RightDown:
                x = this.playerui.x+this.playerui.width-JConfig.cardsW;
                break;
            case DesktopLocation.Down:
                var cardsAllW = JConfig.cardsW+length*JConfig.cardsI;
                x = (Laya.stage.width-cardsAllW)/2+length*JConfig.cardsI;
                break;
            default:
                break;
        }
        return x;
    }
    /**
     * 弃牌
     */
    discardCards():void{
        for(var i = this.cardsArray.length-1 ; i >= 0  ;i--){
            var cards = this.cardsArray[i];
            var toX = cards.endX;
            var toY = cards.endY;
            Laya.Tween.to(cards.cards,{x:toX,y:toY},JConfig.aniCardsTime,null,Laya.Handler.create(this, this.discardCardsComplete, [cards.cards]));
            this.cardsArray.pop();
        }
    }

    discardCardsComplete(cards:CardsUI):void{
        cards.removeSelf();
        cards.destroy();
    }
}