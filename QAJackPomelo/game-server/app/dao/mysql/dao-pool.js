var _poolModule = require('generic-pool');
var mysql = require('mysql');
var mysqlConfig = require('../../../../shared/config/mysql');
var env = process.env.NODE_ENV || 'development';
if(mysqlConfig[env]) {
  mysqlConfig = mysqlConfig[env];
}
/*
 * Create mysql connection pool.
 */
var createMysqlPool = function(app) {
	// var mysqlConfig = app.get('mysql');
	const factory = {
		create: function() {
			return new Promise(function(resolve, reject) {
				var client = mysql.createConnection({
					host: mysqlConfig.host,
					user: mysqlConfig.user,
					password: mysqlConfig.password,
					database: mysqlConfig.database
				});
				resolve(client);
			})
		},
		destroy: function(client) {
			return newPromise(function(resolve) {
				client.end();
				resolve();
			})
		}
	}

	var opts = {
		max: 10, // maximum size of thepool
		min: 2 // minimum size of thepool
	}



	return _poolModule.createPool(factory, opts);
};

exports.createMysqlPool = createMysqlPool;
