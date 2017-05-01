var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
var RoomService = require('./app/services/roomService');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'QAJackPomelo');

// app configuration
app.configure('production|development', 'connector', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		heartbeat: 3,
		useDict: true,
		useProtobuf: true
	});
});
app.configure('production|development', 'gate', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		useProtobuf: true
	});
});
app.configure('production|development', function() {
	// route configures
	app.route('room', routeUtil.room);
	app.loadConfig('mysql', app.getBase() + '/../shared/config/mysql.json');
	// filter configures
	app.filter(pomelo.timeout());
});

// Configure for auth server
app.configure('production|development', 'auth', function() {
	// load session congfigures
	app.set('session', require('./config/session.json'));
});


app.configure('production|development', 'auth|connector', function() {
	var dbclient = require('./app/dao/mysql/mysql').init(app);
	app.set('dbclient', dbclient);
});

app.configure('production|development', 'room', function() {
	var dbclient = require('./app/dao/mysql/mysql').init(app);
	app.set('dbclient', dbclient);
	app.set('roomService', new RoomService(app));
});

// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});