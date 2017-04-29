/*
* name;
*/
class RegisterUI extends ui.registerUI{
    gamedata:GameData;
    constructor(){
        super();
        this.gamedata = GameData.getInstance();
        this.close.on(Laya.Event.CLICK,this,this.onClose);
        this.register.on(Laya.Event.CLICK,this,this.onRegister);
    }
    onClose(e:Laya.Event):void{
        UIMgr.toUI(EUI.Login);
    }
    onRegister(e:Laya.Event):void{
        var uname = this.uname.text;
        var pwd = this.pwd.text;
        if(uname.length > 0 && pwd.length > 0 ){
            var pars = new Array();
            pars.push(['uname',uname]);
            pars.push(['pwd',pwd]);           
            var http = new HttpLaya((err,data)=>{
                if(err){
                    new JDialogUI(err).show();
                }else{
                    if(data.code == Code.OK){
                        var token = data.token;
                        var uid = data.uid;
                        this.gamedata.user.uid = uid;
                        this.gamedata.user.token = token;
                        UIMgr.toUI(EUI.CreateRoom);
                    }else{
                        new JDialogUI(data.code).show();
                    }
                }
            });
            http.sendPost(pars,"register");
        }else{
            new JDialogUI("请输入用户名和密码").show();
        }
    }
}