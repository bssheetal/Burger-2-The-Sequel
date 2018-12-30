var connection = require("./connection.js");

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    all: function (tablename, cb) {

        connection.query("select * from "+tablename, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });
    },

    create:function(tablename,cols,vals,cb)
    {
        var querystring="INSERT INTO"+ " "+tablename+"("+cols.toString()+")"+"VALUES (?)";
        console.log(querystring);
        connection.query(querystring,vals,function(err,result)
        { if(err)
            {
                throw err;
            }

            cb(result);

        });
        
    },

    update: function(tablename, objColVals,id,cb) {
        var queryString = "UPDATE " + tablename
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += "id= ?",[id]
    
        console.log(queryString);
        connection.query(queryString,function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }

}

module.exports = orm;