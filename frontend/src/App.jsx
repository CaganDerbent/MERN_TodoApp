import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Register from './components/Register'
import Login from "./components/Login"
import { useAuthContext } from './hooks/useAuthContext'
import Main from './components/Main'
import { Navigate } from "react-router-dom";
import TodoForm from './components/todoForm'
import { useState,useEffect } from 'react'
import MobileNavbar from './components/MobileNavbar'
import Footer from './components/Footer'

function App() {

  const {user} = useAuthContext()


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Ekran boyutu değiştiğinde bu olay dinleyicisi tetiklenir
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Olay dinleyicisini ekleriz
    window.addEventListener('resize', handleResize);

    // Temizleme işlemi: bileşen çıkartıldığında dinleyiciyi kaldırırız
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(windowWidth <= 600){
    return(
      <div className="App">
        <BrowserRouter>
          <MobileNavbar/>
          
  
          <div className="body">
  
    
  
  
            <Routes>
            <Route path='/' element={user ? <Home/> : <Main/>}></Route>
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/> } />
            </Routes>
         
          </div>
        </BrowserRouter>
      </div>
      
    )
  }
  else{
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          
  
          <div className="body">
  
    
  
  
            <Routes>
            <Route path='/' element={user ? <Home/> : <Main/>}></Route>
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/> } />
            </Routes>
         
          </div>
        </BrowserRouter>
      </div>
    );
  }



//<Route path='/' element={<TodoForm/>} />
//<Route path="/" element={<Home />} />
  

  
}

export default App;

