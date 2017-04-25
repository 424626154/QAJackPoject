/*
* name;
*/
class CardsController{
    /**花色 */
    flower:FLOWER;
    /** 点数 */
    cardsnum:CardsNum;
    index:number;
    endX:number;
    endY:number;
    cards:CardsUI
    constructor(index:number){
        this.cards = new CardsUI(index);
        this.endX = 359;
        this.endY = 478;
    }
}