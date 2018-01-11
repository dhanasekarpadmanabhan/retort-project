var dbConnection = require('../database/dbConnection.js')

exports.select = function(query) {
    return new Promise(function(resolve, reject) {
        var connection = dbConnection.connect1();
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
exports.insert = function(pass) {
    console.log(pass)
}
