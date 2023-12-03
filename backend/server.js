const express = require("express")
const app = express()
const route = require("./routers/route")
const userRoute = require("./routers/userRoute")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")



app.use(express.json())

//middleware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

route.use(bodyParser.json());
userRoute.use(bodyParser.json());

app.use('/api/todos',route)
app.use('/api/todos',userRoute)

//app.use(requestroute)
//app.use(oauthroute)








mongoose.connect("mongodb+srv://cagan:cagan123@merncluster.gdqqpuw.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true })
.then(()=>{
    app.listen(3006,()=> console.log("Server running..."))
    console.log("mongoDB connected.")
})
.catch((err)=>{
    console.log(err)
})




