import './App.css';
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Message from './message';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  const [time, setTime] = useState(new Date('2021-05-05 16:00:00'))
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [messages, setMessages] = useState([
    ])

  const [socket, setSocket] = useState(undefined)

  const [text, setText] = useState('')

  useEffect(() => {
    

    if (loggedIn === false)
      return;

      console.log('socket create', username)

    let socket = socketIOClient(ENDPOINT);
    socket.on("time", data => {
      setTime(new Date(data))
    });

    socket.on("online_users", data => {
      setOnlineUsers(data)
    })

    socket.on("new_message", data => {
      setMessages((old)=>  [...old, data])
    })

    socket.on("old_messages", data => {
      setMessages(data)
    })

    socket.emit('set_username', username);

    setSocket(socket)

    
  }, [loggedIn, username]);

  const handleLogin = () => {
    setLoggedIn(true)
    //console.log('login', username)
  }

  const handleSend = () => {
    socket.emit('send_message', text)
    setText('')
  }

  if (loggedIn === false){
    return (
      <div className="container">
        <h3 className=" text-center">EMC Developers 6</h3>
        <div className="messaging"></div>

        <div key="message_compose" className="type_msg">
          <div className="input_msg_write">
            <input type="text" className="write_msg" placeholder="Хэрэглэгчийн нэр бичнэ үү" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button onClick={handleLogin} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h3 className=" text-center">EMC Developers 6</h3>
      <div className="messaging">
        <div className="inbox_msg row">
          <div key="inbox_people" className="inbox_people col-sm-12 col-md-5">
            <div key="search" className="headind_srch">
              <div className="recent_heading">
                <h4>Идэвхитэй ({onlineUsers.length})</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <h2>{moment(time).format('hh:mm:ss')}</h2>
                  </div>
              </div>
            </div>
            <div key="inbox_chat" className="inbox_chat">
              {
                onlineUsers.map((user) => (
                  <div key={user} className="chat_list">
                    <div className="chat_people">
                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                      <div className="chat_ib">
                        <h5>{user} <span className="chat_date"></span></h5>
                        <p></p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div key="messages" className="mesgs col-sm-12 col-md-7">
            <div key="message_history" className="msg_history">
              {messages.map((message) => (
                <Message key={message.id} message={message} time={time} username={username}/>
              ))
              }

            </div>
            <div key="message_compose" className="type_msg">
              <div className="input_msg_write">
                <input type="text" className="write_msg" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)}/>
                <button className="msg_send_btn" onClick={handleSend} type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
