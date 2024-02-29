const express = require("express")
const app = express()
const route = require("./routers/route")
const userRoute = require("./routers/userRoute")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

require('dotenv').config();



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





const apiKey = process.env.API_KEY;
console.log(apiKey)

mongoose.connect(`mongodb+srv://cagan:${apiKey}@merncluster.gdqqpuw.mongodb.net/?retryWrites=true&w=majority&appName=MERNcluster`, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

.then(() => {
  console.log("MongoDB Connected.");
  app.listen(3031, () => {
      console.log("Server Running...");
  });
})
.catch((error) => {
  console.error(error);
});














