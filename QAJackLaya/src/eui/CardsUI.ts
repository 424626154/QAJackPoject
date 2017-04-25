/*
* name;
*/
class CardsUI extends ui.cardsUI{
    index:number;
    constructor(index:number){
        super();
        this.index = index;
        this.cards.skin = "cards/"+index+".png";
    }
}