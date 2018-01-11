var connection = require('../database/dbConnection.js')

function stock(object) {
    k = '';
    for (var i = 0; i < object['values'].length; i++) {
        val = []
        var field = "SELECT * "
        var from = "from stkdetl ";
        var where = " where ItemCd='" + object['values'][i]['product']['SHCD'] + "' and  BatchNo=" + connection.connect1().escape(object['values'][i]['batch_no']) + "   "
        var order = "  "
        var query = field + from + where + order;
        j1 = new Promise(function(resolve, reject) {
            resolve(connection.queryexec_Sample(query))
        });
        j1.then(function(result) {
          j11 = new Promise(function(resolve, reject) {
            resolve(eval(result, object))
            // eval(result,object['entry'],object['values'][k])
          })
          j11.then(function(result) {
          console.log(result)
        })
        }) //

    }
  no = 0;
}

var no = 0;

function eval(result, object) {
    sucess = undefined
    if (result.length > 0) { // update

        if (result[0]['ItemCd'] == object['values'][no]['product']['SHCD']) {
            qty = 0
            qty = parseInt(result[0]['Qty']) + parseInt((object['values'][no]['qty']).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))

            query = " UPDATE `stkdetl` SET `Qty`=" + qty + " WHERE `ItemCd`='" + result[0]['ItemCd'] + "' and `BatchNo`='" + result[0]['BatchNo'] + "'   "

            success = connection.queryexec_Sample(query)
          } else {

        }
    } else {
        // record is not present insert the record
        field = " INSERT  INTO`stkdetl`(`CCode`,`ItemCd`,`slno`,`BatchNo`,`RecDate`,`Qty`,`QUnit`,`RATE`,`MRP`,`RUnit`,`MfgDt`,`ExpDt`,`EDFlag`)"
        values = "  VALUES(" + connection.connect1().escape(object['values'][no]['product']['CCode']) + ",'" + object['values'][no]['product']['SHCD'] + "','0'," + connection.connect1().escape(object['values'][no]['batch_no']) + "," + connection.connect1().escape(object['entry']['gpdate']) + "," + object['values'][no]['qty'] + ",'" + object['values'][no]['product']['UNIQ'] + "'," + object['values'][no]['rate'] + "," + object['values'][no]['mrp'] + ",'" + object['values'][no]['product']['UNIQ'] + "'," + connection.connect1().escape(object['values'][no]['mfg_dt']) + "," + connection.connect1().escape(object['values'][no]['Exp_dt']) + ",'N')"
        query = field + values;
        success = connection.queryexec_Sample(query)


    }
    var stkcontrol1=new Promise(function(resolve,reject){
      resolve(stkcontl(result, object['entry'], object['values'][no]))
    })
    stkcontrol1.then(function(result) {
  console.log(result)
  })

    if (success != undefined) {
        $("#p1").html("<div class='alert alert-success'><strong>Success!</strong> you have successfully updated the data</div>");
        //  setTimeout(location.reload.bind(location), 5000);
    }
    no++;
}

function stkcontl(result, object, object1) {
    query = "SELECT * FROM `stkcntl` WHERE `itemcd`='" + object1['product']['SHCD'] + "'"

    j1 = new Promise(function(resolve, reject) {

        resolve(connection.queryexec_Sample(query))

    });
    j1.then(function(result) {
        qty1 = parseInt(result[0]['OBQty']) + parseInt(object1['qty']);
        qty2 = parseInt(result[0]['RecQtytot']) + parseInt(object1['qty']);
        qty3 = parseInt(result[0]['RecQtytot']) + parseInt(object1['qty']);
        query = "UPDATE `stkcntl` SET `OpDate`=" + connection.connect1().escape(object['gpdate']) + ",`OBQty`=" + qty1 + ",`RecQtytot`=" + qty2 + ",`RunQty`=" + qty3 + " WHERE `itemcd`='" + result[0]['itemcd'] + "' "
        // eval(result,object['entry'],object['values'][k])
        j1 = new Promise(function(resolve, reject) {

            resolve(connection.queryexec_Sample(query))

        });
        j1.then(function(result) {
            console.log(result)
            // eval(result,object['entry'],object['values'][k])

        })
    }) //
}
module.exports = {
    stock: stock
}
