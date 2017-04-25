// mysql CRUD
var sqlclient = module.exports;

var _pool;

var NND = {};

/*
 * Innit sql connection pool
 * @param {Object} app The app for the server.
 */
NND.init = function() {
    if (!_pool)
        _pool = require('./dao-pool').createMysqlPool();
};

/**
 * Excute sql statement
 * @param {String} sql Statement The sql need to excute.
 * @param {Object} args The args for the sql.
 * @param {fuction} cb Callback function.
 * 
 */
NND.query = function(sql, args, cb) {
    _pool.acquire().then(function(client) {
            client.query(sql, args, function(err, res) {
                // return object back to pool
                _pool.release(client);
                cb(err, res);
            });
        })
        .catch(function(err) {
            // handle error - this is generally a timeout or maxWaitingClients 
            // error
            console.error('[sqlqueryErr] ' + err.stack);
        });
};

/**
 * Close connection pool.
 */
NND.shutdown = function() {
    _pool.destroyAllNow();
};

/**
 * init database
 */
sqlclient.init = function(app) {
    if (!!_pool) {
        return sqlclient;
    } else {
        NND.init();
        sqlclient.insert = NND.query;
        sqlclient.update = NND.query;
        sqlclient.delete = NND.query;
        sqlclient.query = NND.query;
        return sqlclient;
    }
};

/**
 * shutdown database
 */
sqlclient.shutdown = function(app) {
    NND.shutdown(app);
};