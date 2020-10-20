const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:256,
        unique:[true,'this email already exists'],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1256
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);