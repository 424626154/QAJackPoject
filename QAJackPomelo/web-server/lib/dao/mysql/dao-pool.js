var _poolModule = require('generic-pool');
var mysqlConfig = require('../../../../shared/config/mysql');
var mysql = require('mysql');
/*
 * Create mysql connection pool.
 */
var createMysqlPool = function() {
	console.log("mysqlConfig:", mysqlConfig);
	var mysqlConfig = {
		"host": "127.0.0.1",
		"port": "3306",
		"database": "qajack",
		"user": "root",
		"password": "890503"
	}
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