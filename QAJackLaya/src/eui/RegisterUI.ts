/*
* name;
*/
class RegisterUI extends ui.registerUI{
    constructor(){
        super();
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
            var http = new HttpLaya(this.onRegisterCallback);
            http.sendPost(pars,"register");
        }else{
            console.log("参数错误");
        }
    }

    onRegisterCallback(err,data):void{
        if(err != null){
            console.log('err:',err);
        }else{
            if(data.code == 200){
                var token = data.token;
                var uid = data.uid;
            }else{
               console.log('code:',data.code);
            }
        }
    }
}