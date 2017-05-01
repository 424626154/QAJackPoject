/*
* name;
*/
class CardsUI extends ui.cardsUI{
    index:number;
    constructor(index:number){
        super();
        this.index = index;
        if(index = -1){
          this.cards.skin = "cards/back.png";
        }else{
           this.cards.skin = "cards/"+index+".png";
        }
    }
}