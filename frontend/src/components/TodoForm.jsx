import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const TodoForm = ()=>{

    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [until, setUntil] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async (e)=>{

        if(user){
            e.preventDefault()  //bu varsa eklendiğinde tekrar render etmez

            if(!user){
                console.log("you must be logged in")
                return
            }


            const todos = {title,description,until}
    
            const response = await fetch("/api/todos",{
                method:"POST",
                body:JSON.stringify(todos),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
    
            if(!response.ok){
                setError(json.error)
              
    
            }
            if(response.ok){
                setError(null)
                console.log("Todo added.",json)
                setTitle("")
                setDescription("")
                setUntil("")
    
            }
        }
        else{
            e.preventDefault()
            setError("You must be logged in")
        }



    }
    return(

        <form  className="create" onSubmit={handleSubmit} id="createForm">
            <h3 style={{color:"rgb(0,169,0)"}}>Add new to do</h3>
            <input type="text" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} name="title" />
            <input type="text" placeholder="Description" onChange={(e)=> setDescription(e.target.value)} value={description} name="description" />
            
            <button>Add to do</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default TodoForm