var connection_db = require('../database/dbConnection')

function select_imas() {
    return new Promise(function(resolve, reject) {
        var field = "SELECT * "
        var from = "FROM imas ";
        var where = "WHERE 1  "
        var order = "ORDER BY `DESCR` ASC"
        var query = field + from + where + order;
        values = connection_db.queryexec_Sample(query)
        values.then(function(result) {
            resolve(result);
            //  app1.object1=result;

        })
    });
}

module.exports = {
    select_imas: select_imas
};
