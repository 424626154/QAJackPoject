/*
* name;
*/
class LoginUI extends ui.loginUI{
    token:string;
    constructor(){
        super();
        this.login.on(Laya.Event.CLICK,this,this.onLogin);
        this.register.on(Laya.Event.CLICK,this,this.onRegister);
    }
    onLogin():void{
        var uname = this.uname.text;
        var pwd = this.pwd.text;
        if(uname.length != 0 &&pwd.length != 0){
            var pars = new Array();
            pars.push(['uname',uname]);
            pars.push(['pwd',pwd]);           
            var http = new HttpLaya((err,data)=>{
                if(err != null){
                    console.log('err:',err);
                }else{
                    if(data.code == 200){
                        var token = data.token;
                        var uid = data.uid;
                        if(uid){
                            UIMgr.toUI(EUI.CreateRoom);
                            // NetworkMgr.getInstance().queryEntry(uid,(host:string,port:string)=>{
                            //     console.log(token,host,port);
                            //     NetworkMgr.getInstance().entry(host,port,token,()=>{

                            //     });
                            // });
                            GameData.getInstance().user.uid = uid;
                            GameData.getInstance().user.token = token;
                        }
                    }else{
                    console.log('code:',data.code);
                    }
                }
            });
            http.sendPost(pars,"login");
        }else{
            console.log("参数错误");
        }
    }
    onRegister():void{
        UIMgr.toUI(EUI.Register);
    }
}