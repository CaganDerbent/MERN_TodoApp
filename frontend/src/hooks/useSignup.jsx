import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";


export const useSignup = () => {
    

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()
    

    const signup = async (email, password) => {
        setLoading(true);
        setError(null);

        const info = { email, password };

        const response = await fetch("http://localhost:3006/api/todos/users/register", {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // localstroage
            localStorage.setItem('user',JSON.stringify(json))
            //update authcontext (registerda gerek yok)
            //dispatch({type:'LOGIN',payload:json})
            console.log("User added.",json)
            navigate("/login")

            setLoading(false)

            

        }


   
}
return { signup, loading, error };
}
