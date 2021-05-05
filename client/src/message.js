import React from 'react'
import moment from 'moment'
import 'moment/locale/mn';

moment.locale('mn');

const Message = ({message, time, username}) => {
    if (message.from === username){
        return (
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{message.text}</p>
                    <span className="time_date"> {(moment(message.sent).from(moment(time)))}</span> </div>
            </div>
        )
    }

    return (
        <div className="incoming_msg"> 
            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
            <div className="received_msg">
                <div className="received_withd_msg">    
                    <h5 className="username"> {message.from}</h5>
                    <p>{message.text}</p>
                    <span className="time_date"> {(moment(message.sent).from(moment(time)))}</span>
                </div>
            </div>
        </div>
    )
}

export default Message;