const {
    app,
    BrowserWindow,
    Menu,
    shell
} = require('electron')
const $ = require('jquery')
var functions1 = require('../window.js');
var connection_db = require('../database/dbConnection');
var common_Value = require('../sample/required_Value')
var stock = require('../sample/stock')

function period1(obj) {
    var d = new Date();
    var date = d.getDate();
    if (date < 10)
        date1 = '0' + date;
    else {
        date1 = date
    }
    var month = d.getMonth() + 1;
    if (month < 10)
        month1 = '0' + month;
    else {
        month1 = month

    }
    var year = d.getFullYear();
    var preyear = (d.getFullYear() - 1).toString().substr(2, 2);
    var curyear = (d.getFullYear()).toString().substr(2, 2);
    var nextyear = (d.getFullYear() + 1).toString().substr(2, 2);
    d1 = year + '-' + month1 + '-' + date1
    g1 = month1
    if (g1 < "04") {
        return preyear + "-" + curyear
    } else {
        return curyear + "-" + nextyear
    }
}

function insertgate(obj) {
    var connection = connection_db.connect1();
    period = period1(obj)

    var field = "insert into "
    var from = "`gatepass`(`CCode`, `period`, `GPNo`, `GPDate`, `ItemCd`, `BatchNo`, `Qty`, `Rate`, `MRP`, `Unit`, `MfgDt`, `ExpDt`, `EDFlag`, `SFlag`)";
    var values = " "
    var comma = " "
    for (var i = 0; i < obj['values'].length; i++) {
        values = values + comma + " (" + connection.escape(obj['values'][i]['product']['CCode']) + "," + connection.escape(period.toString()) + "," + obj['entry']['gpno'] + "," + connection.escape(obj['entry']['gpdate']) + ",'" + obj['values'][i]['product']['SHCD'] + "','" +
            obj['values'][i]['batch_no'] + "'," + obj['values'][i]['qty'] + "," + obj['values'][i]['rate'] + "," + obj['values'][i]['mrp'] + "," + connection.escape(obj['values'][i]['product']['UNIQ']) + "," +
            connection.escape(obj['values'][i]['mfg_dt']) + " ," + connection.escape(obj['values'][i]['Exp_dt']) + ",'N','S' )   "
        if (i == (obj['values'].length) - 1) {
            comma = "  "
        } else {
            {
                comma = " ,"
            }
        }
        //INSERT INTO `gatepass` (`CCode`, `period`, `GPNo`, `GPDate`, `ItemCd`, `BatchNo`, `Qty`, `Rate`, `MRP`, `Unit`, `MfgDt`, `ExpDt`, `EDFlag`, `SFlag`) VALUES ('2', '2', '2', '2018-01-01 00:00:00', '2', '2', '2', '2', '2', '2', '2017-03-01 00:00:00', '2017-07-04 00:00:00', '2', '2'), ('3', '3', '3', '2018-01-08 00:00:00', '3', '3', '3', '3', '3', '3', '2018-01-02 00:00:00', '2018-01-23 00:00:00', '3',0 '3');
    }
    var vals = "VALUES " + values
    var query = field + from + vals;
    var executed = connection_db.queryexec_Sample(query)
    //  values=queryexec(query)
    if (executed) {
        stkdetl(obj)
    }
}

//when gate pass is entered stkdetl should be updated are inserted
//(i.e)-- if the data of the object(batch_no,itemcd ) are alredy avaiable in the table then updated the value of qty with it
// otherwise insert the record in stkdetl
function stkdetl(obj) {
    stock.stock(obj);
    //send this object to othre js file
}


module.exports = {

    stkdetl: stkdetl,
    insertgate: insertgate,
    period1: period1
}
