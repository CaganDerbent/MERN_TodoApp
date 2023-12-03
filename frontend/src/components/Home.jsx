import {useState , useEffect} from "react"
import TodoForm from "./todoForm"
import formatDistanceToNow from "date-fns/formatDistanceToNow" // date-fns
import { useAuthContext } from "../hooks/useAuthContext"

const Home = ()=>{

  const {user} = useAuthContext()

   const [Todo , setTodo] = useState(null)
   const [status , setStatus] = useState("black")
   const [active, setActive] = useState("")
   const [number1 , setNumber] = useState("0")
   const [number2 , setNumber2] = useState("0")
   const [number3 , setNumber3] = useState("0")

    //const {Todo,dispatch} = useTodoContext()
    const {todoStatus,settodoStatus} = useState(null)


    const deleteFunc = async (Todo)=>{
        const response = await fetch('/api/todos/'+ Todo._id,{
            method:"DELETE",
            headers:{
              'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if(response.ok){
            console.log("Delete succesful !" + Todo._id)
            setTodo((prevTodos) => prevTodos.filter(t => t._id !== Todo._id));
        }

    }
    const completeFunc = async (todo) => {
        try {
          const updatedData = {
            status: "Completed",
          };
      
          const response = await fetch("/api/todos/complete/"+ todo._id ,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedData),
          });
      
          const json = await response.json();
      
          if (response.ok) {
            console.log("Completed!" + todo._id);
            setTodo((prevTodos) => // statei değiştirir geçici olarak
              prevTodos.map((t) =>
                t._id === todo._id ? { ...t, status: "Completed" } : t
              )
            );
            settodoStatus(true)
          } else {
            console.error("Eror");
          }
        } catch (error) {
          console.error("Error", error);
        }
      }


    const failFunc = async (todo)=>{
        try{
            const updatedData2 = {
                Newstatus:"Failed"
            }

            const response = await fetch("/api/todos/fail/" + todo._id,{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                  },
                body:JSON.stringify(updatedData2)

            })
            const json = await response.json()
            if (response.ok) {
                console.log("Failed!" + todo._id);
                setTodo((prevTodos) => // statei değiştirir geçici olarak
                  prevTodos.map((t) =>
                    t._id === todo._id ? { ...t, status: "Failed" } : t
                  )
                );
                settodoStatus(false)
              } else {
                console.error("Error");
              }
            } 
            catch (error) {
                console.error("Error", error);
              }
          }
        const completedList = async(todo) =>{
          console.log("completedlist")
          const response = await fetch("/api/todos/completed",{
            headers:{
              'Authorization': `Bearer ${user.token}`
            }
          })

          const json = await response.json()

          if(response.ok){
            setTodo(json)
            setStatus("rgb(0,169,0)")
            setActive(false)
            console.log("Json: " + json)

            if(json.length === 0){
              console.log("boş")
            }
        }
        else{
          console.log("hata")
        }

}

const fetchTodo = async () => {

  if(user){
    const response = await fetch("/api/todos/" ,{
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if(response.ok){
        setTodo(json)
        setStatus("black")
        setActive(true)
        console.log(json)
       // dispatch({type:"SHOW_ACTIVE",payload: json})
    }
    else{
      console.log("hata")
    }
  }
  else{
    console.log("user not found.")
  }

  
};

const failedList = async(todo) =>{
  console.log("completedlist")
  const response = await fetch("/api/todos/failed" ,{
    headers:{
      'Authorization': `Bearer ${user.token}`
    }
  })

  const json = await response.json()

  if(response.ok){
    setTodo(json)
    setStatus("red")
    setActive(false)
    console.log(json)
}
else{
  console.log("hata")
}

}
useEffect(()=>{
  console.log("useEffect")

  const response = fetch("/api/todos/",{
    headers:{
      'Authorization': `Bearer ${user.token}`
    }
  })
  .then(response => response.json())
  .then(json => setNumber(json.length));

  const response2 = fetch("/api/todos/completed",{
    headers:{
      'Authorization': `Bearer ${user.token}`
    }
  })
  .then(response2 => response2.json())
  .then(json2 => setNumber2(json2.length));

  const response3 = fetch("/api/todos/failed",{
    headers:{
      'Authorization': `Bearer ${user.token}`
    }
  })
  .then(response3 => response3.json())
  .then(json3 => setNumber3(json3.length));

 
 


  
},[Todo])

return(
  <div className="home">
      <TodoForm/>
  <div className="TodosContainer">
      <div className="titles">
          <button className="title" onClick={fetchTodo}>
              <h4>Active {`(${number1})`}</h4>
              <div className="line"></div>
              </button>
         <button className="title" onClick={completedList}>
              <h4>Completed {`(${number2})`}</h4>
          <div className="line" id="completed"></div>
          </button>
          <button className="title"onClick={failedList} id="failedtitle">
              <h4>Failed {`(${number3})`}</h4>
          <div className="line" id="failed"></div>
          </button>
      </div>
      </div>
      {active ? Todo && Todo.map((Todos)=> (
          <div className="todos" key={Todos._id}>
              <h1 id="tt" style={{color:"black"}}>{Todos.title}</h1>
              <p><strong>Description:</strong> {Todos.description}</p>
              <p><strong>Status:</strong><span style={{color:status}}> {Todos.status}</span></p>
              <p id="time" style={{color:"black"}}>Created {formatDistanceToNow(new Date(Todos.createdAt),{addSuffix:true})}.</p>
              <button id="DeleteButton"onClick={()=> deleteFunc(Todos)}><i className="fa-solid fa-trash fa-lg" style={{color:"whitesmoke"}}></i></button>
              <button id="CompleteButton" onClick={()=> completeFunc(Todos)}><i className="fa-solid fa-check fa-lg" style={{color:"whitesmoke"}}></i></button>
              <button id="FailButton"onClick={()=>failFunc(Todos)}><i className="fa-solid fa-xmark fa-lg"  style={{color:"whitesmoke"}}></i></button>
  
     
             
          </div>

      )) : Todo && Todo.map((Todos)=> (
        <div className="todos" key={Todos._id}>
            <h1>{Todos.title}</h1>
            <p><strong>Description:</strong> {Todos.description}</p>
            <p><strong>Status:</strong><span style={{color:status}}> {Todos.status}</span></p>
            <p id="time" style={{color:"black"}}>Created {formatDistanceToNow(new Date(Todos.createdAt),{addSuffix:true})}.</p>
            <button id="DeleteButton"onClick={()=> deleteFunc(Todos)}><i className="fa-solid fa-trash fa-lg" style={{color:"whitesmoke"}}></i></button>

   
           
        </div>

    ))  }
 
 
  
  </div>
  
  
  
  

  
 )}





 
export default Home;





