// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '120.78.166.246',
    port: 3306,
    user: 'root',
    password: 'dsbzsw',
    database: 'blog',
    dateStrings: true
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}

exports.query = query;