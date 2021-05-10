const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message=>{
    console.log(message);
});

// message submit 

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg= e.target.elements.msg.value;

    // emit a message to server
    socket.emit('chatmessage',msg);
})