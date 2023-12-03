import {Link} from 'react-router-dom'
import Footer from './Footer'

const Main = ()=>{

    return(
        <div className="main">
            <h1 id='frm'>Welcome to TodoApp !</h1>
            <p id='exp'>Stay organized and manage your tasks effortlessly with our user-friendly Todo App. Whether you're a student, professional, or just someone looking to stay on top of their daily activities, our app is here to help. Create, edit, and track your to-do lists with ease. Say goodbye to the chaos and start achieving your goals one task at a time. Sign up now to get started!</p>
            <Footer/>
        </div>
    )
}

export default Main