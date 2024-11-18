import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";



export const useLogin = ()=>{
    const navigate = useNavigate()

    const {user} = useAuthContext()

    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email,password)=>{
        setLoading(true)
        setError(null)

        const info = {email,password}

        const response = await fetch("http://localhost:3006/api/todos/users/login",{
            method:"POST",
            body:JSON.stringify(info),
            headers:{
                'Content-Type':'application/json',
                
            }
        })

        const json = await response.json()

        if(response.ok){
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update authContext
            dispatch({type:'LOGIN',payload: json})
            navigate("/")


        
            setLoading(false)

            


           
            
        }
        if(!response.ok){
            try{
                setLoading(false)
                setError(json.error)
                console.log(json)

            }
            catch(error){
                console.log(error)
            }
            
        }

    }

    return {login,loading,error}

}