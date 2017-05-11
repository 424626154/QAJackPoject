/*
* name;
*/
class Room{
    roomId:number;
    players:Array<Player>;
    slocations:Array<number>;
    clocations:Array<number>;
    myuid:number;
    countdownindex:number;//倒计时索引
    constructor(){
        this.players = new Array();
    }
}