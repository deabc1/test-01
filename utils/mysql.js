var _ = require('./_');
var pool = null;

module.exports = function(_db) {
    pool = require('mysql').createPool(_db);

    return {
        query: function(sql, arg, fn) {
            if (_.isUndefined(fn)) {
                fn = arg;
                arg = null;
            }
            pool.getConnection(function(err, conn) {
                conn.query(sql, arg, function(err, docs) {
                    conn.release();
                    return fn(err, docs);
                });
            });
        },
        delete: function(tbl, cond, fn) {
            pool.getConnection(function(error, connection) {
                connection.query('DELETE FROM  ' + tbl + ' WHERE ' + cond, function(err, result) {
                    connection.release();
                    return fn(err, result);
                });
            });
        },
        update: function(tbl, obj, cond, fn) {
            for (var i in obj)
                
                //if (typeof obj[i] == 'function' || typeof obj[i] == 'object')
                if (typeof obj[i] == 'function')
                    delete obj[i];

            pool.getConnection(function(error, connection) {
                var query = connection.query('UPDATE ' + tbl + ' SET ? WHERE ' + cond, obj, function(err, result) {
                    connection.release();
                    return fn(err, result);
                });
            });
        },
        create: function(tbl, obj, fn) {
            for (var i in obj)
                //if(typeof obj[i] == 'function' || typeof obj[i]=='object')
                if (typeof obj[i] == 'function')
                    delete obj[i];

            pool.getConnection(function(error, connection) {
                var query = connection.query('INSERT INTO ' + tbl + ' SET ?', obj, function(err, result) {
                    connection.release();
                    return fn(err, result);
                });
            });
        },
        transaction: function(tbl, obj, fn) {
            /* Begin transaction
            connection.beginTransaction(function(err) {
              if (err) { throw err; }
              connection.query('INSERT INTO names SET name=?', "sameer", function(err, result) {
                if (err) {
                  connection.rollback(function() {
                    throw err;
                  });
                }

                var log = result.insertId;

                connection.query('INSERT INTO log SET logid=?', log, function(err, result) {
                  if (err) {
                    connection.rollback(function() {
                      throw err;
                    });
                  }
                  connection.commit(function(err) {
                    if (err) {
                      connection.rollback(function() {
                        throw err;
                      });
                    }
                    console.log('Transaction Complete.');
                    connection.end();
                  });
                });
              });
            });
             End transaction */

            for (var i in obj)
                if (typeof obj[i] == 'function' || typeof obj[i] == 'object')
                    delete obj[i];

            pool.getConnection(function(error, connection) {
                var query = connection.query('INSERT INTO ' + tbl + ' SET ?', obj, function(err, result) {
                    connection.release();
                    return fn(err, result);
                });
            });
        },
        exec: function(sql, fn) {
            pool.getConnection(function(error, connection) {
                var query = connection.query(sql, function(err, result) {
                    connection.release();
                    return fn(err, result);
                });
            });
        }
    };
};