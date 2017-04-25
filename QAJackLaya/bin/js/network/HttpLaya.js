/*
* name;
*/
var HttpLaya = (function () {
    function HttpLaya(httpCallback) {
        this.httpCallback = httpCallback;
        this.baseurl = "http://localhost:3001";
        this.http = new Laya.HttpRequest();
        this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
        this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
        this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
    }
    HttpLaya.prototype.sendPost = function (pars, type) {
        var par = this.parsToStr(pars);
        this.http.send(this.baseurl + "/" + type, par, 'post', 'json');
    };
    HttpLaya.prototype.sendGet = function (pars) {
        var par = this.parsToStr(pars);
        this.http.send(this.baseurl + "?" + par, null, 'get', 'json');
    };
    HttpLaya.prototype.parsToStr = function (pars) {
        var par = "";
        for (var i = 0; i < pars.length; i++) {
            par += pars[i][0] + "=" + pars[i][1];
            if (i < pars.length - 1) {
                par += "&";
            }
        }
        console.log("par:", par);
        return par;
    };
    HttpLaya.prototype.onHttpRequestProgress = function (e) {
        console.log(e);
    };
    HttpLaya.prototype.onHttpRequestComplete = function (e) {
        console.log(this.http.data);
        if (this.httpCallback) {
            this.httpCallback(null, this.http.data);
        }
    };
    HttpLaya.prototype.onHttpRequestError = function (e) {
        console.log(e);
        if (this.httpCallback) {
            this.httpCallback(e, null);
        }
    };
    return HttpLaya;
}());
//# sourceMappingURL=HttpLaya.js.map