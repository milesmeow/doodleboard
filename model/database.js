const pg = require('pg');

const conString =
"postgres://duooyrso:di84nxi2WcxHQzS6cwjXhKS9gWRFS33R@pellefant.db.elephantsql.com:5432/duooyrso";

const client = new pg.Client(conString);

const Database = {
  testConnection : function () {
    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query('SELECT NOW() AS "theTime"', function (err, result) {
        if (err) {
          return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
      });
    });
  }

}


module.exports = Database;