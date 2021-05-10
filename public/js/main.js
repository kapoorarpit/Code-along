const chatForm = document.getElementById('chat-form');
const chatMessages= document.querySelector('.chat-messages');
const socket = io();


// message from server
socket.on('message', message=>{
    console.log(message);
    outputmessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;// scroll upto height  
});

// message submit 

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg= e.target.elements.msg.value;

    // emit a message to server
    socket.emit('chatmessage',msg);

    // output msg to dom
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

})

function outputmessage(message){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML=  `<p class="meta">${message.username} <span>${message.time}</span></p>
                    <p class="text">
                    ${message.text}
                    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}