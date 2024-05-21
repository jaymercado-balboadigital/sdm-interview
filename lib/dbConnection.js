const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 4,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "test",
  port: 3306,
});

module.exports = {
  query(...argument) {
    console.log("argument", argument);
    let sqlArgs = [];
    const args = [];
    for (let i = 0; i < argument.length; i += 1) {
      args.push(argument[i]);
    }
    const callback = args[args.length - 1]; // last arg is callback
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return callback(err);
      }
      if (args.length > 2) {
        const [, replacements] = args;
        sqlArgs = replacements;
      }
      connection.query(args[0], sqlArgs, (qryErr, results) => {
        connection.release(); // always put connection back in pool after last query
        if (qryErr) {
          console.error(qryErr);
          return callback(qryErr);
        }
        return callback(null, results);
      });
      return this;
    });
  },
};
