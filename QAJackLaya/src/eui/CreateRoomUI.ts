/*
* name;
*/
class CreateRoomUI extends ui.createroomUI{
    roomid:number;
    networkMgr:NetworkMgr;
    gameData:GameData;
    constructor(){
        super();
        this.networkMgr = NetworkMgr.getInstance();
        this.gameData = GameData.getInstance();
        this.close.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            UIMgr.toUI(EUI.Login);
        });
        this.create.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            if(this.roomid == 0 ){
                this.createRoom();
            }else{
                this.joinRoom(this.roomid);
            }
        });
        this.join.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
            this.roomid = Number(this.jroomid.text);
            this.joinRoom(this.roomid);
        })
        var uid = this.gameData.user.uid;
        var pars = new Array();
        pars.push(['uid',uid]);           
        var http = new HttpLaya((err,data)=>{
            if(err != null){
                console.log('err:',err);
            }else{
                if(data.code == 200){
                    var roomid = data.roomid;
                    this.reloadCreateRoomUI(roomid);
                }else{
                    console.log("error code:",data.code);
                }
            }
        });
        http.sendPost(pars,"getroom");
    }

    reloadCreateRoomUI(roomid:number):void{
        this.roomid = roomid;
        this.croomid.text = roomid+'';
        if(roomid ==0){
            this.create.label = '创建房间';
        }else{
            this.create.label = '返回房间';
        }
    }
    /**
     * 创建房间
     */
    createRoom():void{
        var uid = GameData.getInstance().user.uid;
        var pars = new Array();
        pars.push(['uid',uid]);           
        var http = new HttpLaya((err,data)=>{
            if(err != null){
                new JDialogUI(err).show();
            }else{
                if(data.code == Code.OK){
                    var roomid = data.roomid;
                    this.reloadCreateRoomUI(roomid);
                }else{
                   new JDialogUI(data.code ).show();
                }
            }
        });
        http.sendPost(pars,"creatroom");
    }
    joinRoom(roomid:number):void{
        var token = this.gameData.user.token;
        var uid = this.gameData.user.uid;
        this.networkMgr.queryEntry(uid,(host:string,port:string)=>{
            console.log(token,host,port);
            this.networkMgr.entry(host,port,uid,roomid,(data)=>{
                if(data.code == Code.OK){
                    this.networkMgr.initPushMsg();
                    console.log('data:',data);
                    this.gameData.room.roomId = data.roomid;
                    this.gameData.room.slocations = data.locations ;
                    this.gameData.room.myuid = data.user;
                    this.gameData.room.clocations = DataUtil.locationsS2C(this.gameData.room.slocations,this.gameData.room.myuid );
                    UIMgr.toUI(EUI.Room);
                }else{
                    console.error('error code:',data.code);
                }
            });
        });
    }
}