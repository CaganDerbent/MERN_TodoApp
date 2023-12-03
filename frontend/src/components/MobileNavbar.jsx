import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

const MobileNavbar = ()=>{

    const {user} = useAuthContext()
    const {logout} = useLogout()

    const [bar,setBar] = useState(false)
    const [vision,setVision] = useState("hidden")

  

    const handleClick = ()=>{
        setBar(!bar)
        console.log(bar)
        setVision("hidden")
        if(vision === "hidden"){
            setVision("visible")
        }
    }
    const handleClick2 = ()=>{
        logout()

    }

    return(
        
        <div>
            <div className="container2">
           <Link to="/" id='lol2' ><h2 className="link">TodoApp <i className="fa-solid fa-book-open"></i></h2></Link>
           <button id='bar' onClick={handleClick}>{bar ? <i className="fa-solid fa-x fa-xl" style={{color:"rgb(0,169,0)"}}></i> :<i className="fa-solid fa-bars fa-xl" style={{color:"rgb(0,169,0)"}}></i>}</button>

        </div>
        {!user && <div className="one" style={{visibility:vision}}>{!user && <Link to ="/register" className='mobilelink'><h4>Signup</h4><div className='line'></div></Link>}</div>}
        {!user && <div className="one" style={{visibility:vision}}>{!user &&  <Link to ="/login" className='mobilelink'><h4>Login</h4><div className='line'></div></Link>}</div>}
        {user && <div className="one" style={{visibility:vision}}>{user.email}</div>}
        {user && <button className='one' id='log' onClick={handleClick2}  style={{visibility:vision}}>Logout</button>}
        
        
        
        
        
        

        </div>


    

    )
}
export default MobileNavbar;