const todo = require('../models/todo')
const mongoose = require("mongoose")



const fullTodoList = async (req, res) => {

    try {
      const todos = await todo.find({ user_id }).sort({ createdAt: -1 }); // en son en başa
  
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };





  const fullList = async(req,res)=>{
    const user_id = req.user._id

    try{
        const active = await todo.find({status:"Active",user_id}).sort({createdAt:-1})

        res.status(200).json(active)
        
    }
    catch (err) {
        res.status(500).json({ error: err.message });
      }
}
const  createTodo = async (req,res) =>{
    const {title,description,until,status} = req.body

    try{
        const user_id = req.user._id
        const Todo = await todo.create({title,description,until,status,user_id})
        res.status(200).json(Todo)

    } catch(err){
        res.status(404).json({err: err.message})
        console.log(err)
    }
    
}

const getTodo = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("No todo")
    }
    const Todo = await  todo.findById(id)

    if(!Todo){
        return res.status(404).json({error: "Error"})

    }
    res.status(200).json(Todo)

}
const deleteTodo = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("No todo")
    }
    const todos = await todo.findOneAndDelete({_id: id})
    console.log({id})


    if(!todos){
        return res.status(404).json({error: "Error"})

    }

    res.status(200).json(todos)


}
const completeTodo = async(req,res)=>{


    const {id} =  req.params

    const updatedStatus = {
        status:"Completed"

    }
    const updatedTodo = await todo.findByIdAndUpdate(id,updatedStatus,{new:true})
    console.log({id})

    if(!updatedTodo){
        res.status(404).json({message:"Could not find item."})
    }
    res.status(200).json(updatedTodo)

   

    }
    const failTodo = async (req, res) => {
        const { id } = req.params;
      
        const updatedStatus = {
          status: "Failed",
        };
      
        const updatedTodo = await todo.findByIdAndUpdate(id, updatedStatus, { new: true });
        console.log({ id });
      
        if (!updatedTodo) {
          res.status(404).json({ message: "Could not find item." });
        }
        res.status(200).json(updatedTodo);
      }
    const completedList = async(req,res)=>{
        const user_id = req.user._id


        try{
            const completed = await todo.find({status:"Completed",user_id}).sort({createdAt:-1})

            res.status(200).json(completed)
            
        }
        catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    const failedList = async(req,res)=>{
        const user_id = req.user._id


        try{
            const failed= await todo.find({status:"Failed",user_id}).sort({createdAt:-1})

            res.status(200).json(failed)
            
        }
        catch (err) {
            res.status(500).json({ error: err.message });
          }
    }
 
    
module.exports = {
    fullList,
    createTodo,
    getTodo,
    deleteTodo,
    completeTodo,
    failTodo,
    completedList,
    failedList,
    fullTodoList


}

