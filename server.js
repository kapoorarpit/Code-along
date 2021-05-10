// moment for date and time 
// nodemon to not to restart server again and again

const http = require('http');
const path = require('path');
const express = require('express');
const app= express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


//set static folder
app.use(express.static(path.join(__dirname,'public')));

// run when client connects
io.on('connection', socket=>{

    socket.emit('message', 'welcome to codeAlong')

    // broadcast 
    // connect
    socket.broadcast.emit('message', 'A user has joined');
    // disconnects 
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left');
    });

    // listen for chat message
    socket.on('chatmessage', (msg)=>{
        io.emit('message',msg);
    });
});

const PORT = 3000|| process.env.PORT;
server.listen(PORT), ()=> console.log('server running on port ${PORT}');
