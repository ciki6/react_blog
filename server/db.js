// 连接MySQL
let mysql = require('mysql');
let pool = mysql.createPool({
    host: '45.76.55.25',
    port: 3306,
    user: 'root',
    password: 'zswdsb',
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