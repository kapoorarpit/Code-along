const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();


// get username and room 
const { username,room}= Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

// join chatroom
socket.emit('joinroom', {username,room});

//get room user
socket.on('roomUsers',({room, users})=>{
    outputRoomName(room);
    outputUsers(users);
});

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


function outputRoomName(room){
    roomName.innerText = room;
}

function outputUsers(users){
    userList.innerHTML = ` 
    ${users.map(user=> `<li> ${user.username}</li>`).join('')}
    `;
}