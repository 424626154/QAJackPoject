/*
* name;
*/
class NpcController{
    npc:Npc;
    chipArray:Array<ChipUI>;
    cardsArray:Array<CardsController>
    roomui:RoomUI;
    constructor(roomui){
        this.init();
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
        var cardsnum = 10;
        var cardsallw = JConfig.cardsW+(cardsnum-1)*JConfig.cardsI;
        var startx = (this.roomui.width-cardsallw)/2;
        var starty = 190;
        for(var i = 0 ;i < cardsnum;i++){
            var cards = new CardsController(i);
            cards.cards.x = startx+i*JConfig.cardsI;
            cards.cards.y = starty;
            this.roomui.addChild(cards.cards);
            this.cardsArray.push(cards);
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


}