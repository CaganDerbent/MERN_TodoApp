const jwt = require("jsonwebtoken")
const User = require("../models/users")

const requireAuth = async (req,res,next)=>{

    //verify auth
    const {authorization} = req.headers


    //console.log(req.headers)

    if(!authorization){
       return res.status(401).json({error: "Authorization token required."})
    }

    console.log("requireAuth")

    // "xxx 485u4jgnrfmoelfp.rjg66" bu stringler ayrılacak.

    const token = authorization.split(" ")[1]
    console.log("token :"+token)

    try{

        const {_id} = jwt.verify(token,'SuperSecret')
        req.user = await User.findOne({_id}).select('_id')

 
        next()

    }
    catch(err){
        console.log(err)
        res.status(401).json({error:"Not authorized."})

    }

}

module.exports = requireAuth