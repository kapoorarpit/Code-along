const chatForm = document.getElementById('chat-form');
const socket = io();

// message from server
socket.on('message', message=>{
    console.log(message);
    outputmessage(message);
});

// message submit 

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg= e.target.elements.msg.value;

    // emit a message to server
    socket.emit('chatmessage',msg);

    // output msg to dom

})

function outputmessage(message){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML=  `<p class="meta">Brad <span>9:12pm</span></p>
                    <p class="text">
                    ${message}
                    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}