var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if (!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), chatServers);
	cb(null, res.id);
};

exp.room = function(session, msg, app, cb) {
	var gameServers = app.getServersByType('room');

	if (!gameServers || gameServers.length === 0) {
		cb(new Error('can not find room servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), gameServers);
	cb(null, res.id);
};