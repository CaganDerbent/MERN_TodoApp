import { useState } from "react"
import {useLogin} from "../hooks/useLogin"
import {Link} from 'react-router-dom'
import Footer from './Footer'


const Login = ()=>{

    

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {login,error,loading} = useLogin()

    const handleSubmit = async (e)=>{
        login(email,password)
        e.preventDefault()

 

  

        setEmail("")
        setPassword("")


    }

 

    
    return(
        <div className="register">
        <div className="create">
        <div className="cont">

        <form onSubmit={handleSubmit}>
        <h2 id="frm">Login</h2>
            <input type="email"placeholder="Email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button disabled={loading} className="form">Login</button>
        </form>
        
        <p style={{color:"whitesmoke"}}>Dont have an account ? <Link to="/register" id="q">Signup</Link></p>
        {error && <div className="error">{error}</div>}



        </div>
        </div>
        <Footer/>
        

        
      
    </div>
   
    )
}
export default Login