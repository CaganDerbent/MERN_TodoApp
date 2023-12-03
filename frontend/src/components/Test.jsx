const Test = ()=>{

    return (
        {Todo && Todo.map((Todos)=> (
            <div className="todos" key={Todos._id}>
                <h1>{Todos.title}</h1>
                <p><strong>Description:</strong> {Todos.description}</p>
                <p><strong>Status:</strong><span style={{color:status}}> {Todos.status}</span></p>
                <p id="time" style={{color:"black"}}>Created {formatDistanceToNow(new Date(Todos.createdAt),{addSuffix:true})}.</p>
                <button id="DeleteButton"onClick={()=> deleteFunc(Todos)}><i className="fa-solid fa-trash fa-lg" style={{color:"whitesmoke"}}></i></button>
                <button id="CompleteButton" onClick={()=> completeFunc(Todos)}><i className="fa-solid fa-check fa-lg" style={{color:"whitesmoke"}}></i></button>
                <button id="FailButton"onClick={()=>failFunc(Todos)}><i className="fa-solid fa-xmark fa-lg"  style={{color:"whitesmoke"}}></i></button>
    
       
               
            </div>



Todo && Todo.map((Todos)=> (
    <div className="todos" key={Todos._id}>
        <h1>{Todos.title}</h1>
        <p><strong>Description:</strong> {Todos.description}</p>
        <p><strong>Status:</strong><span style={{color:status}}> {Todos.status}</span></p>
        <p id="time" style={{color:"black"}}>Created {formatDistanceToNow(new Date(Todos.createdAt),{addSuffix:true})}.</p>
        <button id="DeleteButton"onClick={()=> deleteFunc(Todos)}><i className="fa-solid fa-trash fa-lg" style={{color:"whitesmoke"}}></i></button>
        <button id="CompleteButton" onClick={()=> completeFunc(Todos)}><i className="fa-solid fa-check fa-lg" style={{color:"whitesmoke"}}></i></button>
        <button id="FailButton"onClick={()=>failFunc(Todos)}><i className="fa-solid fa-xmark fa-lg"  style={{color:"whitesmoke"}}></i></button>


       
    </div>

))
  
        ))}
    )
}

export default Test