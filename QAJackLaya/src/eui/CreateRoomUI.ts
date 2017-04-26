/*
* name;
*/
class CreateRoomUI extends ui.createroomUI{
    roomid:number;
    constructor(){
        super();
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
        var uid = GameData.getInstance().user.uid;
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

    createRoom():void{
        var uid = GameData.getInstance().user.uid;
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
        http.sendPost(pars,"creatroom");
    }
    joinRoom(roomid:number):void{

    }
}