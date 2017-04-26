/*
* name;
*/
class GameData{
    static _instance = null;
    user:User;
    constructor(){
        this.user = new User();
    }

    static getInstance() : GameData{
        if (GameData._instance == null){
            GameData._instance = new GameData();
        }
        return GameData._instance;
    }
}