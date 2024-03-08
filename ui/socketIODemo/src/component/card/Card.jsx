import './Card.css'
import Heart from '../../img/heart.svg'
import HeartFill from '../../img/heartFilled.svg'
import Comment from '../../img/comment.svg'
import Infor from '../../img/info.svg'
import Share from '../../img/share.svg'
import {useState} from "react";

function Card({post, socket, user}) {
    const [like, setLike] = useState(false)

    const handleNotification = (type) => {
        setLike(true)
        socket.emit('sendNotification', {
            senderName: user,
            receiverName: post.username,
            type: type
        })

    }

    return (
        <div className='card'>
            <div className="infor">
                <img src={post.userImg} alt="" className="userImg"/>
                <span>
                    {post.fullname}
                </span>
            </div>
            <img src={post.postImg} alt="" className="postImg"/>
            <div className="interaction">
                {
                    like ?
                        <img src={HeartFill} alt="" className="cardIcon"/>
                        :
                        <img src={Heart} alt="" className="cardIcon" onClick={() => handleNotification(1)}/>
                }
                <img src={Comment} alt="" className="cardIcon" onClick={() => handleNotification(2)}/>
                <img src={Share} alt="" className="cardIcon" onClick={() => handleNotification(3)}/>
                <img src={Infor} alt="" className="cardIcon inforIcon"/>
            </div>
        </div>
    );
}

export default Card;