const users = [];

//join user to chat

function userjoin(id, username, room){
    const user= {id, username, room};
    
    users.push(user);

    return user;
}

function getuser(id){
    return users.find(user=>user.id==id);
}

function userleave(id){
    const index= users.findIndex(user=> user.id === id);

    if(index!=-1)
    {
        return users.splice(index, 1)[0];
    }
}

function getroomsusers(room){
    return users.filter(user=> user.room=== room);
}

module.exports=
{
    userjoin,
    getuser,
    userleave,
    getroomsusers
};