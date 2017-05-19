/*
* name;
*/
class NpcController{
    npc:Npc;
    chipArray:Array<ChipUI>;
    cardsArray:Array<CardsController>
    roomui:RoomUI;
    gameData:GameData;
    constructor(roomui){
        this.init();
        this.gameData = GameData.getInstance();
        this.roomui = roomui;
    }

    init():void{
        this.chipArray = new Array();
    }
    /**
     * 下注
     */
    addChip(chipnum:number,player:ui.playerUI):void{
        var rsx:number = 250; 
        var rex:number = 480;
        var rsy:number = 290;
        var rey:number = 570
        var tox = Math.floor(Math.random() * (rex-rsx) + rsx); 
        var toy = Math.floor(Math.random() * (rey-rsy) + rsy); 
        var  rotation = Math.floor(Math.random() * 360);
        var chipUI = new ChipUI(chipnum);
        chipUI.x = player.x+player.width/2;
        chipUI.y = player.y+player.height/2;
        this.chipArray.push(chipUI);
        this.roomui.addChild(chipUI);
        Laya.Tween.to(chipUI,{x:tox,y:toy,rotation:rotation},JConfig.aniChipTime,null,Laya.Handler.create(this, this.onAddchipaniComplete, [chipUI]));
        
    }

    onAddchipaniComplete(chipUI:ChipUI):void{
        console.log("onAddchipaniComplete");
    }

    /**
     * 回收筹码
     */
    getAllChip(player:ui.playerUI){
        for(var i = this.chipArray.length - 1 ; i >= 0 ;i-- ){
            var chip = this.chipArray[i];
            var toX = player.x+player.width/2;
            var toY = player.y+player.height/2;
            Laya.Tween.to(chip,{x:toX,y:toY},JConfig.aniChipTime,null,Laya.Handler.create(this, this.getAllChipComplete, [chip]));
            this.chipArray.pop();
        }
    }

    getAllChipComplete(chipUI:ChipUI):void{
        console.log("getAllChipComplete");
        chipUI.removeSelf();
        chipUI.destroy();
    }


    initCards():void{
        if(this.cardsArray != null){
            for(var i = this.cardsArray.length - 1 ; i >= 0 ;i-- ){
                var cards = this.cardsArray[i];
                cards.cards.removeSelf();
                cards.cards.destroy();
                this.cardsArray.pop();
            }
        }else{
            this.cardsArray = new Array();
        }
        var cardsnum = 52;
        var cardsallw = JConfig.cardsW+(cardsnum-1)*JConfig.cardsNI;
        var startx = (this.roomui.width-cardsallw)/2;
        var starty = 190;
        for(var i = 0 ;i < cardsnum;i++){
            var cards = new CardsController(-1);
            cards.cards.x = startx+i*JConfig.cardsNI;
            cards.cards.y = starty;
            this.roomui.addChild(cards.cards);
            this.cardsArray.push(cards);
        }
    }
    /**
     * 首次发牌
     */
    firstDealCards():void{
        this.initCards();
        for(var i = 0 ; i < this.gameData.room.clocations.length;i++ ){
            if(this.gameData.room.clocations[i] != 0){
                for(var j = 0 ;j < 2;j ++){
                  this.dealCards(this.roomui.pucArray[i]);
                }
            }
        }
    }
    /**
     * 发牌
     */
    dealCards(playerCon:PlayerController):void{
        if(this.cardsArray.length == 0){
            return;
        }
        var cards = this.cardsArray[this.cardsArray.length-1];
        // var toX = playerCon.playerui.x+(playerCon.cardsArray.length-1)*JConfig.cardsI;
        var toX = playerCon.getAddCardsX();
        var toY = playerCon.playerui.y+playerCon.playerui.height+JConfig.cardsIPH;
        Laya.Tween.to(cards.cards,{x:toX,y:toY},JConfig.aniCardsTime,null,Laya.Handler.create(this, this.dealCardsComplete, [cards.cards]));
        this.cardsArray.pop();
        playerCon.addCards(cards,this.roomui);
    }

    dealCardsComplete(cards:CardsUI):void{
        console.log("dealCardsComplete");
    }
    /**
     * 弃牌
     */
    discardCards(playerCon:PlayerController):void{
        for(var i = playerCon.cardsArray.length-1 ;i >= 0;i--){
            var toX = Laya.stage.width/2;
            var toY = Laya.stage.height/2;
            var cards = playerCon.cardsArray[i].cards;
            Laya.Tween.to(cards,{x:toX,y:toY},JConfig.aniCardsTime,null,Laya.Handler.create(this, this.discardCardsComplete, [cards]));
            playerCon.cardsArray.pop();
     }
    }
    discardCardsComplete(cards:CardsUI):void{
        console.log("discardCardsComplete");
        cards.removeSelf();
        cards.destroy();
    }

}