/*
* name;
*/
var GameData = (function () {
    function GameData() {
        this.user = new User();
    }
    GameData.getInstance = function () {
        if (GameData._instance == null) {
            GameData._instance = new GameData();
        }
        return GameData._instance;
    };
    return GameData;
}());
GameData._instance = null;
//# sourceMappingURL=GameData.js.map