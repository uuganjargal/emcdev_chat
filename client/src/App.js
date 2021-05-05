import './App.css';
import React, {useState} from 'react'
import moment from 'moment'
import Message from './message';

function App() {
  const [time, setTime] = useState(new Date('2021-05-05 16:00:00'))
  const [username, setUsername] = useState('Дондог')
  const [onlineUsers, setOnlineUsers] = useState([{name:'Бат', desc: '', since:new Date('2021-05-06 16:00:00')}])
  const [messages, setMessages] = useState([
    {from:'Дорж', sent:new Date('2021-05-05 15:00:00'), text:'Test which is a new approach to have all solutions'},
    {from:'Дондог', sent:new Date('2021-05-04 10:11:00'), text:'We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.'},
    {from:'Сандаг', sent:new Date('2021-05-04 16:00:00'), text:'Test which is a new approach to have all solutions'},
  ])

  const [text, setText] = useState('')

  return (
    <div className="container">
      <h3 className=" text-center">EMC Developers 2</h3>
      <div className="messaging">
        <div className="inbox_msg row">
          <div className="inbox_people col-sm-12 col-md-5">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Идэвхитэй ({onlineUsers.length})</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <h2>{moment(time).format('hh:mm:ss')}</h2>
                  </div>
              </div>
            </div>
            <div className="inbox_chat">
              {
                onlineUsers.map((user) => (
                  <div className="chat_list">
                    <div className="chat_people">
                      <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                      <div className="chat_ib">
                        <h5>{user.name} <span className="chat_date">{moment(user.since).format('hh:mm')}</span></h5>
                        <p>{user.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mesgs col-sm-12 col-md-7">
            <div className="msg_history">
              {messages.map((message) => (
                <Message message={message} time={time} username={username}/>
              ))
              }

            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input type="text" className="write_msg" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.data)}/>
                <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
