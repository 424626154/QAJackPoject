/*
* name;
*/
class GameData{
    static _instance = null;
    user:User;
    room:Room;
    constructor(){
        this.user = new User();
        this.room = new Room();
    }

    static getInstance() : GameData{
        if (GameData._instance == null){
            GameData._instance = new GameData();
        }
        return GameData._instance;
    }
}