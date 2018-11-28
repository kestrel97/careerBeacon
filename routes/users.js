const express = require('express');
const database = require('../config/database')
const mysql = require('mysql');
const router = express.Router();

// connecting DB
var pool = mysql.createPool({
  host     : database.host,
  user     : database.username,
  password : database.password,
  database : database.database
});

pool.getConnection((err,connection) => {
  if (err) {
    console.error('Error Connecting MySQL: ' + err);
    return;
  }
  console.log('MySQL connected successfully.');

  router.post('/register', (req, res) => {
    // connection.query('SELECT * FROM user', function (error, results, fields) {
      // res.send(results);
    // });
    var sql = "INSERT INTO test (qid, questions) VALUES (1,'what do you want to do in life?')";
    // var values = [req.body.fname,req.body.lname,req.body.email,req.body.pass,req.body.access];
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Number of records inserted: " + result.affectedRows);
      });

  });

});





router.get('/authenticate', (req, res) => {
  res.send('AUTHENTICATE');

});




module.exports = router;
