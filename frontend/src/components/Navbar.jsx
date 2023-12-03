import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

const Navbar = ()=>{
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = ()=>{
        logout()

    }

    return(
        <div className="container">
           <Link to="/" id='lol' ><h2 className="link">TodoApp <i className="fa-solid fa-book-open"></i></h2></Link>
         
           {user && (
            <div>
            <span id='email'>{user.email}</span>
            <button onClick={handleClick} id='logout'>Logout</button>
           </div>
           )}
           {!user && (<ul>
            <Link to ="/" className='link'><h4>Home</h4><div className='line'></div></Link>
           <Link to ="/register" className='link'><h4>Signup</h4><div className='line'></div></Link>
           <Link to ="/login" className='link'><h4>Login</h4><div className='line'></div></Link>
           </ul>
           )}
        </div>
    )
}
export default Navbar;