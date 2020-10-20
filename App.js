const express = require('express');

const mongoose = require('mongoose')

const todoController = require('./controller/todoController')

const userController = require('./controller/userController')

const { checkUser } = require('./Validation/VerfiyToken');

require('dotenv/config');

const app = express();

const cookieParser = require('cookie-parser')

//template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

app.use(express.json());

app.use(cookieParser());

//make an page can access the name of the current user
app.get('*',checkUser);


//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected!')
});

//fire todos controller
todoController(app);

//fire user controller
userController(app);

//listen to port 3000
app.listen(3000);