import { todoContext } from "../context/todoContext";
import { useContext } from "react";

export const useTodoContext = ()=>{

    const context = useContext(todoContext)

    if(!context){
        throw Error("useTodocontext must be in todoContext")
    }

    return context
}