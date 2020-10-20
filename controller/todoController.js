
const Todo = require('../models/todos')
const {verifyToken} = require('../Validation/VerfiyToken');

module.exports = function(app){

    //get all todos
    app.get('/', verifyToken, async function(req,res){
        try{
            const todos = await Todo.find({currentUserId:req.user});
            res.render('todos',{todos:todos});
            // console.log(req.user)
        }catch(err){
            res.json({message:err})
        }
    })

    //post a todo
    app.post('/', verifyToken, async function(req,res){
        // data.push(req.body)
        const todo = new Todo({
            inputText: req.body.inputText,
            currentUserId: req.user
        });

        try{
            const savedTodo = await todo.save();
            res.json(savedTodo);
        
        } catch(err) {
            res.json({message:err})
        }
    })

    //delete a todo
    app.delete('/:todoId', verifyToken, async function(req,res){
        try{
            const removedPost = await Todo.remove({_id:req.params.todoId})
            res.json(removedPost)
        } catch(err) {
            res.json({message:err})  
        } 
    })

    //update a todo
    app.patch('/updateTodo/:todoId', verifyToken, async function(req,res){
        try{
            console.log(req.body)
            const updatedPost = await Todo.updateOne({_id:req.params.todoId},{$set:{inputText:req.body.inputText}})
            res.json(updatedPost)
        } catch(err) {
            res.json({message:err})  
        } 
    })
    
    //check a todo
    app.patch('/checkedTodo/:todoId', verifyToken, async function(req,res){
        try{
            console.log(req.body)
            const updatedPost = await Todo.updateOne({_id:req.params.todoId},{$set:{checked:req.body.checked}})
            res.json(updatedPost)
        } catch(err) {
            res.json({message:err})  
        } 
    })

}