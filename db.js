const express = require("express")
const app= express

const mongoose = require('mongoose')
const mongourl = "mongodb://localhost:27017/ShopNow"

mongoose.connect(mongourl,{

    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('open',()=>{
    console.log("connected to database")
  })
  db.on('error',(err)=>{
    console.log("error occuring",err)

  })
db.on('disconnected',()=>{
    console.log('Disconnected fron database')
})
process.on('SIGINT', () => {
    db.close(() => {
      console.log('Database connection closed due to application termination');
      process.exit(0);
    });
  });


  

  module.exports = db