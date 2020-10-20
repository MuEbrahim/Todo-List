let mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    inputText:{
        type:String,
        required:true
    },
    currentUserId:{
        type:String,
        required:true
    },
    checked:{
       type: Boolean,
       default:false
    }
})

module.exports = mongoose.model('todos',TodoSchema);