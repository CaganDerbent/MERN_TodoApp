const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({

    password:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
},{timestamps:true})

userSchema.statics.login = async function (email, password) {

    if(!email || !password){
        console.log(email,password) // undefined
        throw Error("Empty value dedected.")
    }


    const user = await this.findOne({email})

    if(!user){
        throw Error("Invalid email")
        
    
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Invalid password.")
    }
    return user;


}

userSchema.statics.signup = async function(email,password) {

    const mewcud = await this.findOne({email})

    if(mewcud){
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password: hash })

    return user;
}


module.exports = mongoose.model("NewUser",userSchema)