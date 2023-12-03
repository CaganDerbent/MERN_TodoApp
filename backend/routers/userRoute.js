const express = require("express")
const router = express.Router()




const {loginUser,signupUser,userList} = require("../controllers/userController")


router.post("/users/login",loginUser)


router.get("/users/register",userList)
router.post("/users/register",signupUser)

module.exports = router;