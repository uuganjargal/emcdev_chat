const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,  {
    cors: {
    origin: '*',
  }
});

let onlineUsers = new Set()

let messages = []

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('set_username', (data) => {
        console.log(data)
        socket.username = data

        onlineUsers.add(socket.username)

        console.log([...onlineUsers])

        io.emit('online_users', [...onlineUsers])

        socket.emit('old_messages', messages)
    })

    socket.on('send_message', (data) => {
        let newmessage = {'id': makeid(10), 'from': socket.username, 'text': data, 'sent': new Date().toUTCString()}
        messages.push(newmessage)
        console.log(messages)
        io.emit('new_message', newmessage)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');

        onlineUsers.delete(socket.username)
        console.log([...onlineUsers])
        io.emit('online_users', [...onlineUsers])
    });
});

setInterval(myTimer, 1000);

function myTimer() {
  //console.log('timer event');
  var d = new Date();
  var n = d.toUTCString();
  io.emit('time', n)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello world 3</h1>');
});

app.get('/test', (req, res) => {
    res.send('test2');
  });

server.listen(5000, () => {
  console.log('listening on *:5000');
});