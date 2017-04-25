/*
* 枚举;
*/
class Enum{
    constructor(){

    }
}
/**连接状态 */
const enum ServerState{
    //未登录
    //在线
    //掉线
}
/**用户房间状态 */
const enum RoomState{
    //观看
    //坐下
}
/**用户游戏状态 */
const enum UserState{
    //大厅
    //房间
}
/**花色 */
const enum FLOWER{
    FLOWER_DIAMOND,// 方片
    FLOWER_CLUB,// 梅花
    FLOWER_HEART,// 红桃
    FLOWER_SPADE// 黑桃
}
/**点数 */
const enum CardsNum{
    NUM_2 = 2,
    NUM_3,
    NUM_4,
    NUM_5,
    NUM_6,
    NUM_7,
    NUM_8,
    NUM_9,
    NUM_10,
    NUM_J,
    NUM_Q,
    NUM_K,
    NUM_A
}
/**ui枚举 */
const enum EUI{
    Loading,//加载页面
    Test,//测试页面
    Room,//房间
    Login,//登录
    Register//注册
}

/**玩家桌面位置 */
const enum DesktopLocation{
    LeftUp,
    LeftDown,
    RightUp,
    RightDown,
    Down
}
