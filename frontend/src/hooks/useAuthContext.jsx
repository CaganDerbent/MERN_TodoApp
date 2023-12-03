import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = ()=>{

    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthcontext must be in authContext")
    }

    return context
}