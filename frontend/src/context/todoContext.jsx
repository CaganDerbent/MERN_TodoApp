import { createContext, useReducer } from "react";

export const todoContext = createContext()

export const todoReducer = (state,action)=>{
    switch(action.type){
        case 'SHOW_ACTIVE' :
           return{
            Todo : action.payload
           } 
        case 'ADD_TODO' :
            return{
                Todo : [todos.payload, ...state.todos]
            }
        default :
        return state;
    }

}

export const todoContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(todoReducer,{
        Todo:null
    })

    // dispatch({type: 'SET_TODOS', payload:[{},{}]})
 
    return (
        <todoContext.Provider value={{...state,dispatch}}>
            {children}
        </todoContext.Provider>
    )

}