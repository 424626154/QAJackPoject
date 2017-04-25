/*
* name;
*/
class HttpLaya{
    httpCallback:Function;
constructor(httpCallback:Function){
        this.httpCallback = httpCallback;
        this.baseurl = "http://localhost:3001";
        this.http = new Laya.HttpRequest();
        this.http.once(Laya.Event.PROGRESS,this,this.onHttpRequestProgress);
        this.http.once(Laya.Event.COMPLETE,this,this.onHttpRequestComplete);
        this.http.once(Laya.Event.ERROR,this,this.onHttpRequestError);
    }

    public http:Laya.HttpRequest;
    public baseurl:string;

    sendPost(pars:Array<[string,any]>,type:string):void{
        var par = this.parsToStr(pars);
        this.http.send(this.baseurl+"/"+type, par, 'post', 'json');
    }

    sendGet(pars:Array<[string,any]>):void{
        var par = this.parsToStr(pars);
        this.http.send(this.baseurl+"?"+par, null, 'get', 'json');
    }
    parsToStr(pars:Array<[string,any]>):string{
        var par = "";
        for(var i = 0 ;i < pars.length;i++){
            par += pars[i][0]+"="+pars[i][1];
            if(i < pars.length-1){
                par += "&";
            }
        }
        console.log("par:",par);
        return par;
    }
    onHttpRequestProgress(e):void{
       console.log(e);
    }
    onHttpRequestComplete(e):void{
       console.log(this.http.data);
       if(this.httpCallback){
            this.httpCallback(null,this.http.data);
       }
    }
    onHttpRequestError(e):void{
       console.log(e);
       if(this.httpCallback){
           this.httpCallback(e,null);
       }
    }
}