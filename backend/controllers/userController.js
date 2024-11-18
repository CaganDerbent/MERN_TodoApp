const jwt = require("jsonwebtoken")
const user = require("../models/users")


const createToken = (_id)=>{
    return jwt.sign({_id},'SuperSecret',{expiresIn:'6h'})
}


const loginUser = async  (req,res)=>{
    const {email,password} = req.body

    try{
        const User = await  user.login(email,password)

        const token = createToken(User._id)

        res.status(200).json({email,token})
        console.log("TOKEN:",token)

    }
    catch(error){
        res.status(400).json({error: error.message})
        console.log(error)
    }
}
    
const signupUser = async (req,res)=>{
    const {password,email} = req.body

    try{

        if( !password  || !email ){
            throw Error("Empty value dedected.")
        }

        const User = await  user.signup(email,password)

        const token = createToken(User._id)

        res.status(200).json({email,token})
        console.log("TOKEN: ",token)

    }
    catch(error){
        res.status(400).json({error:error.message})
        console.log(error)
    }
}

const userList = async(req,res)=>{
    const users = await user.find().sort({createdAt:-1})

    res.status(200).json(users)
}


module.exports = {
    loginUser,
    signupUser,
    userList
}