import {useEffect, useState} from "react";
import {socket} from "./socket.js";
import './app.css'
import Navbar from "./component/navbar/Navbar.jsx";
import Card from "./component/card/Card.jsx";
import {posts} from './data.js'
import {Toaster} from "sonner";

function App() {
    const [userName, setUserName] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, []);

    useEffect(() => {
        socket.emit('newUser', user)
    }, [user]);

    return (
        <div>
            <Toaster/>
            <div className='container'>
                {user ? (<>
                    <Navbar socket={socket}/>
                    {posts.map(post => <Card key={post.id} post={post} socket={socket} user={user}/>)}
                    <span className='username'>{userName}</span>
                </>) : (
                    <div className='login'>
                        <input onChange={(e) => setUserName(e.target.value)} value={userName} placeholder='Username'/>
                        <button onClick={() => setUser(userName)}>Login</button>
                    </div>
                )
                }
            </div>
        </div>

    );
}

export default App;
