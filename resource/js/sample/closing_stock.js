var connection_db = require('../database/dbConnection')
function sample_closing_stock()
{
  console.log("dhanasekar")
  console.log(process.env.productindustry)
 field="SELECT  *  "
 from=" FROM stkdetl a,imas b "
 where="WHERE a.ItemCd=b.SHCD and a.Qty > 0 and a.CCode="+process.env.productindustry+"   "
 order="ORDER BY a.RecDate DESC "
  var query = field + from + where+order;
  console.log(query)
  var executed = connection_db.queryexec_Sample(query)
  if(executed)
  {
  return executed
  }
}

module.exports = {
    sample_closing_stock:sample_closing_stock

  }
