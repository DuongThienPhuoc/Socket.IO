import './NavBar.css'
import Notification from '../../img/notification.svg'
import Message from '../../img/message.svg'
import Setting from '../../img/settings.svg'
import {useEffect, useState} from "react";
import {toast} from "sonner";

function Navbar({socket}) {
    const [notification, setNotification] = useState([])
    useEffect(() => {
        socket.on('getNotification', (data) => {
            setNotification((prev) => [...prev, data])
            toast(`${data.senderName} react your post`)
        })
        return () => {
            socket.off('getNotification')
        }
    }, [socket]);
    console.log(notification)
    return (
        <div className='navbar'>
            <span className="logo">
                Logo
            </span>
            <div className="icons">
                <div className="icon">
                    <img src={Notification} alt="" className='iconImg'/>
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Message} alt="" className='iconImg'/>
                    <div className="counter">2</div>
                </div>
                <div className="icon">
                    <img src={Setting} alt="" className='iconImg'/>
                    <div className="counter">2</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;