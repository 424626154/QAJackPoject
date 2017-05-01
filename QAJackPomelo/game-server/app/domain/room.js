var Room = function () {
    //房间ID
    this.roomId = 0;
    //桌子上的玩家
    this.deskPlayers = [0,0,0,0,0];
    this.watchPlayers = [];
    this.deskCards = [];
    this.pokers = [];
    this.playerPokers = [[],[],[],[],[]];
}

module.exports = Room;