import { useState } from "react"
import {useSignup} from "../hooks/useSignup"
import {Link} from 'react-router-dom'

import Footer from './Footer'



const Register = ()=>{

    

    const {loading,error,signup} = useSignup()


    

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    


    const handleUser = async (e)=>{

        e.preventDefault()

        await signup(email,password)
        

        setEmail("")
        setPassword("")

        

    
        }

    return(
       <div className="register">
            <div className="create">
            <div className="cont">

            <form onSubmit={handleUser}>
            <h2 id="frm">Signup</h2>
                <input type="email"placeholder="Email" name="email" value={email}onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                 <button disabled={loading} className="form" >Signup</button>
            </form>
           
                 <p style={{color:"whitesmoke"}}>Already have an account ? <Link to="/login" id="q">Login</Link></p>
                 {error && <div className="error">{error}</div>}
            </div>
        </div>
        <Footer/>
        </div>
        
    )} 
   

export default Register