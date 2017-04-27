/*
* 网络管理器
*/
class NetworkMgr{
    static _instance = null;
    private pomelo:PomeloLaya.Pomelo;
    private host = "127.0.0.1";
    private post = 3014;
    private state:NetworkState;
    /**加入房间推送 */
    static PUSH_MSG_JOIN:string = "onJoin";
    /**开始游戏 */
    static PUSH_MSG_START:string = "onStart";
    /**退出游戏 */
    static PUSH_MSG_BACK:string = "onBack";
    /** 发牌 */
    static PUSH_MSG_DEAL:string = "onDeal";

    static MSG_LOOKCARDS:string = "LookCards";
    /**
	 * 单例模式
	 */
	static getInstance() : NetworkMgr{
        if (NetworkMgr._instance == null){
            NetworkMgr._instance = new NetworkMgr();
        }
        return NetworkMgr._instance;
    }

    constructor(){
        this.initPomelo();
    }
    /**
     * 初始化Pomelo
     */
    initPomelo():void{
        var reg = this;
        this.pomelo = new PomeloLaya.Pomelo();
        this.pomelo.on(PomeloLaya.Pomelo.EVENT_IO_ERROR, function(event){
            //错误处理
            console.error("error",event);

        });
        this.pomelo.on(PomeloLaya.Pomelo.EVENT_CLOSE, function(event){
            //错误处理
            console.error("error",event);
            reg.reconnectionPomelo();
        });
        
    }
    /**
     * 初始化推送信息
     */
    setPushMsg(type:string):void{
        this.pomelo.on(type, function(event){
            //错误处理
            console.error("push msg type:",type,"data:",event);
            NetworkEmitter.fire(type,event); 
        });
    }
    /**
     * 连接Pomelo
     */
    onQueryEntry(uid:string,rid:string,callback:Function):void{
        var reg = this;
        this.pomelo.init({
            host: this.host,
            port: this.post
        }, function (result) {
            //连接成功执行函数
            console.log("link success result:",result);
           if(result.code == 200){
                var route = "gate.gateHandler.queryEntry";
                var msg = {
                    uid:uid
                }
                reg.pomelo.request(route,msg, function (result) {
                    if(result.code == 2001){
                        console.log("Servers error!");
                        return;
                    }
                    if(result.code == 200){
                        reg.pomelo.disconnect();
                        callback(reg,result.host,result.port,uid,rid);
                    }else{
                        console.log("Servers error ! code:",result.code);
                    }
                });
           }
        });
    }
    /**
     * 断开链接
     */
    disconnectPomelo():void{
        this.pomelo.disconnect();
    }
    /**
     * 重连
     */
    reconnectionPomelo():void{

    }
    

    queryEntry(uid:string, callback:Function):void{
        var init_par = {
                    host: this.host,
                    port: this.post
                }
       this.pomelo.init(init_par,(result) => {
            if(result.code == 200){
                var route = "gate.gateHandler.queryEntry";
                var msg = {
                    uid:uid
                }
                this.pomelo.request(route,msg,(result) => {
                        if(result.code == 2001){
                            console.log("Servers error!");
                            return;
                        }
                        if(result.code == 200){
                            this.pomelo.disconnect();
                            callback(result.host, result.port);
                        }else{
                            console.log("Servers error ! code:",result.code);
                        }
                });
            }
       });
    }

    entry(host, port,uid,rid, callback):void{
        var init_par = {
                    host: host,
                    port: port
                }
        this.pomelo.init(init_par,(result)=>{
            this.pomelo.request('connector.entryHandler.entry', {uid: uid,rid:rid},(data)=>{
               callback(data);
            });
        });
    }
}

const enum NetworkState{
    Connect,//连接
    Reconnection//重连
}
