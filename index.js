const express = require('express')
const app = express()
const path=require('path')
const mongoose = require('mongoose')
const bodyParser=require("body-parser"); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/galleryDB');

app.set('view engine','pug');
app.set('views','./views');
app.use(express.static(path.join(__dirname,'/static')));
app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

var routes = require('./routes/app_router');
routes(app);

app.listen("8030")
console.log("App started at 8030...")
module.exports = app;
