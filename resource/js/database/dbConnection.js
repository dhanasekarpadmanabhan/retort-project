/*    dbConnection .js
 * This is the js file where connection established with the database
 * queries are executed(all queries)
 *
 *
 */
//connect() is the sales db
function connect() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'last'
    });
    return con;
}

//connect1() is the sample db
function connect1() {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'retort sample'
    });
    return con;
}
// the queries are runned for sample applicaiton
function queryexec_Sample(query) {
    return new Promise(function(resolve, reject) {
        var connection = connect1();
        // connect to mysql
        connection.connect(function(err) {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
            }
        });
        h = ""
        $query = query;
        console.log($query)
        connection.query($query, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            }
            h = rows;
            resolve(rows);
        });
    });
}

// the queries are runned for sample applicaiton
function queryexec_Sales(query) {
    return new Promise(function(resolve, reject) {
        var connection = connect();
        // connect to mysql
        connection.connect(function(err) {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);
            }
        });
        h = ""
        $query = query;
        console.log($query)
        connection.query($query, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                return;
            }
            h = rows;
            resolve(rows);
        });
    });
}
module.exports = {
    queryexec_Sales: queryexec_Sales,
    queryexec_Sample: queryexec_Sample,
    connect: connect,
    connect1: connect1,
};
