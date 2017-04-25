/*
* name;
*/
class TestUI extends ui.testUI{
    constructor(){
        super();
        this.init();
    }
    init():void{
        this.start.on(Laya.Event.CLICK,this,this.onStart);
    }
    onStart(e:Laya.Event){
        var name = this.uname.text;
        var room = this.room.text;
        UIMgr.toUI(EUI.Room);
        // if(name.length > 0 && room.length > 0 ){
        //     console.log("name:",name);
        //     NetworkMgr.getInstance().requestJoin(room,name);
        //     NetworkEmitter.register(NetworkMgr.PUSH_MSG_JOIN,this.onPushJoin,this);
        // }else{
        //     console.error("参数错误");
        // }
    }

    /**
     * 请求加入房间
     */
    onPushJoin(type:string,data:any):void{
        console.log("onRequestJoinCallback:",data);
        var code  = data.code;
        if(code == 0){
            var roomid = data.roomid;
            var user = data.user;
            var locations = data.locations;

            UIMgr.toUI(EUI.Room);
        }else{
             var error  = data.error;
             console.error(error);
        }
    }
}