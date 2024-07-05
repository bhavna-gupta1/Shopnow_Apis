const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const userroutes = require("./Routes/UserRoutes");
const productroutes = require('./Routes/Poductroutes')

// const db= require("./db");
const app=express();
app.use(bodyParser.json())
app.use("/",productroutes)
app.use("/",userroutes)

app.listen(3001,()=>{
    console.log("server is listening")
  })