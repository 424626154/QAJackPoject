/*
* name;
*/
class Room{
    roomId:number;
    players:Array<Player>;
    slocations:Array<number>;
    clocations:Array<number>;
    myuid:number;
    constructor(){
        this.players = new Array();
    }
}