import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { todoContextProvider } from "./context/todoContext.jsx"
import { AuthContextProvider } from './context/authContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </React.StrictMode>
)
