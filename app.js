const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

const users = require('./routes/users');

const port =3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

app.use('/users', users );

// indexRoute
app.get('/', (req,res) =>{
  res.send("Invalid Endpoint");
})

app.listen(port, ()=>{
  console.log("server started @ port: "+port);
})
