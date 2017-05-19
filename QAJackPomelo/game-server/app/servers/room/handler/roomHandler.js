var Code = require('../../../../../shared/code');

module.exports = function(app) {
    return new Handler(app);
};
var Handler = function(app) {
    this.app = app;
    this.roomService = app.get('roomService');
};
var handler = Handler.prototype;

handler.discard = function(msg,session,next){
    // console.log('uid',msg.userid);
    var roomService = this.roomService;
    var roomid = msg.rid;
    var userid = msg.userid;
    console.log('roomid:',roomid,'userid:',userid);
    console.log('step 1');
    roomService.discard(roomid,userid,function(roomid,userid) {
        next(null, {
            code: Code.OK,
            room:roomid,
            uid:userid
        });
    })
}