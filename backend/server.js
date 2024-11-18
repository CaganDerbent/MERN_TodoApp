const express = require("express")
const app = express()
const route = require("./routers/route")
const userRoute = require("./routers/userRoute")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

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


mongoose.connect(`mongodb+srv://cagan:${apiKey}@merncluster.gdqqpuw.mongodb.net/?retryWrites=true&w=majority&appName=MERNcluster`, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

.then(() => {
  console.log("MongoDB Connected.");
  app.listen(3006, () => {
      console.log("Server Running...");
  });
})
.catch((error) => {
  console.error(error);
});














