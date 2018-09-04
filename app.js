const express = require('express')
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//body parser middleware
app.use(bodyParser.json());

// create connection
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'nodemysql'
});
//test connection START
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('DB connected as id ' + db.threadId);
});
//test connection END

// insert in DB/register
app.get('/register',(req,res) =>{
    console.log(req);
});
// insert in DB/register
app.get('/userList',(req,res) =>{
    db.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User list.' });
    });
});
/*app.get('/getUserById/:id',(req,res) =>{
    var user_id = req.params.id;       
    db.query('SELECT * FROM users where id=?',[user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User detail.' });
    });
});*/
app.get('/getUserById/:id', function (req, res) {
    db.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User detail.' });
  });
});

app.get('/', (req, res) => res.send('Hello Demo!'))

app.listen(3232, () => console.log('Example app listening on port 3232!'))