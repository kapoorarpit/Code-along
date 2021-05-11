// moment for date and time 
// nodemon to not to restart server again and again

const http = require('http');
const path = require('path');
const express = require('express');
const app= express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatmessage = require('./public/utils/messages')
const name= 'CodeAlong';
const {userjoin, getuser, getroomsusers, userleave}= require('./public/utils/users');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

// run when client connects
io.on('connection', socket=>{

    socket.on('joinroom',({username,room})=>{

        const user = userjoin(socket.id, username, room);
        socket.join(user.room)

        socket.emit('message',formatmessage(name,'welcome to codeAlong'))

        // broadcast 
        // connect
        socket.broadcast.to(user.room).emit('message',formatmessage(name, `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getroomsusers(user.room)
        });
    });

    // listen for chat message
    socket.on('chatmessage', msg=>{
        const user = getuser(socket.id); 

        io.to(user.room).emit('message',formatmessage(user.username,msg));
    });
    
    // disconnects 
    socket.on('disconnect', ()=>{   
        const user= userleave(socket.id);
        if(user){
        io.to(user.room).emit('message',formatmessage(name,`${user.username} has left`));

        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users: getroomsusers(user.room)
        });
    }
    });
    
});

const PORT = 3000|| process.env.PORT;
server.listen(PORT), ()=> console.log('server running on port ${PORT}');
